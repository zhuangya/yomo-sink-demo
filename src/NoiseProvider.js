import { createContext, useContext, useState, useEffect } from "react";
import { EMPTY, fromEvent } from "rxjs";
import { bufferCount, map, bufferTime } from 'rxjs/operators';
import io from "socket.io-client";
import { useObservableState } from "observable-hooks";

const NoiseContext = createContext({});

export function NoiseProvider({ children }) {
  const [noise$, setNoise$] = useState(EMPTY);

  useEffect(() => {
    const socket = io("https://yomo.cel-la.store", {
      transports: ['websocket']
    })

    setNoise$(fromEvent(socket, 'receive_sink'))
    return () => {
      setNoise$(null);
      return socket.disconnect();
    };
  }, []);

  const x = useObservableState(noise$.pipe(
    // FIXME: 这里要改成类似 kline 的形式：
    // 1. 累计一定时间之内的 max min (bar)
    // 2. 积累多个 bar
    bufferTime(1000),
    map(list => ({
      max: Math.max(...list),
      min: Math.min(...list)
    })),
    bufferCount(2), // FIXME: this is incorrect
  ), []);

  return (
    <NoiseContext.Provider value={{ noise$, x }}>{children}</NoiseContext.Provider>
  );
}

export function useNoise() {
  const { x } = useContext(NoiseContext);

  return x;
}
