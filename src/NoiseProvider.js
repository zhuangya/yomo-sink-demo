import { createContext, useContext, useState, useEffect } from "react";

import { EMPTY, fromEvent } from "rxjs";
import { scan } from "rxjs/operators";
import io from "socket.io-client";

const NoiseContext = createContext({});

export function NoiseProvider({ children }) {
  const [noise$, setNoise$] = useState(EMPTY);

  useEffect(() => {
    const socket = io("https://yomo.cel-la.store");

    setNoise$(
      fromEvent(socket, "receive_sink").pipe(
        scan((acc, one) => [...acc, one.toFixed(1)].slice(-10), []),
      )
    );

    return () => {
      setNoise$(null);
      return socket.disconnect();
    };
  }, []);

  return (
    <NoiseContext.Provider value={{ noise$ }}>{children}</NoiseContext.Provider>
  );
}

export function useNoise() {
  const { noise$ } = useContext(NoiseContext);
  return noise$;
}
