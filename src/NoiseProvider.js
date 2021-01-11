import { createContext, useContext, useState, useEffect } from "react";

import { timer, EMPTY, fromEvent } from "rxjs";
import { withLatestFrom, share, scan } from "rxjs/operators";
import io from "socket.io-client";

const NoiseContext = createContext({});

const clock$ = timer(20, 200);

function feedChart(data$, size = 10, defaultResult = null) {
  return function (source) {
    return source.pipe(
      withLatestFrom(data$, (_, x) => x),
      scan(
        (acc, one) => [...acc, one].slice(-size),
        Array(size).fill(defaultResult)
      )
    );
  };
}

export function NoiseProvider({ children }) {
  const [raw$, setRaw$] = useState(EMPTY);

  useEffect(() => {
    const socket = io("https://yomo.cel-la.store", {
      transports: ["websocket"],
    });

    const raw$ = fromEvent(socket, "receive_sink").pipe(share());
    setRaw$(raw$);

    return () => {
      setRaw$(null);
      return socket.disconnect();
    };
  }, []);

  return (
    <NoiseContext.Provider
      value={{ noise$: clock$.pipe(feedChart(raw$)), lastReading$: raw$ }}
    >
      {children}
    </NoiseContext.Provider>
  );
}

export function useNoise() {
  const { noise$ } = useContext(NoiseContext);
  return noise$;
}

export function useLastReading() {
  const { lastReading$ } = useContext(NoiseContext);
  return lastReading$;
}
