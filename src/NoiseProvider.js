import { createContext, useContext, useState, useEffect } from "react";

import { EMPTY, fromEvent } from "rxjs";
import { map, scan } from "rxjs/operators";
import io from "socket.io-client";

const NoiseContext = createContext({});

export function NoiseProvider({ children }) {
  const [noise$, setNoise$] = useState(EMPTY);

  useEffect(() => {
    const socket = io("https://yomo.cel-la.store", {
      transports: ["websocket"],
    });

    setNoise$(
      fromEvent(socket, "receive_sink").pipe(
        scan(
          (acc, one, index) =>
            [
              ...acc,
              {
                primary: index,
                secondary: one,
              },
            ].slice(-10),
          []
        ),
        map((data) => [
          {
            label: "noise",
            data,
          },
        ])
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
