import io from "socket.io-client";

import { createContext, useContext, useState, useEffect } from "react";

import { EMPTY, fromEvent } from "rxjs";
import { pairwise, map, share, distinctUntilChanged } from "rxjs/operators";

const NoiseContext = createContext({});

export function NoiseProvider({ children }) {
  const [raw$, setRaw$] = useState(EMPTY);

  useEffect(() => {
    const socket = io("https://yomo.cel-la.store", {
      transports: ["websocket"],
    });

    const raw$ = fromEvent(socket, "receive_sink").pipe(
      map(x => x.toFixed(1)),
      pairwise(),
    );
    setRaw$(raw$);

    return () => {
      setRaw$(null);
      return socket.disconnect();
    };
  }, []);

  return (
    <NoiseContext.Provider value={{ lastReading$: raw$ }}>
      {children}
    </NoiseContext.Provider>
  );
}

export function useLastReading() {
  const { lastReading$ } = useContext(NoiseContext);
  return lastReading$;
}
