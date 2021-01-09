import { createContext, useContext, useState, useEffect } from "react";

import { EMPTY, fromEvent } from "rxjs";
import { share, map, scan } from "rxjs/operators";
import io from "socket.io-client";

const NoiseContext = createContext({});

function feedChart() {
  return function (source) {
    return source.pipe(
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
    );
  };
}

export function NoiseProvider({ children }) {
  const [raw$, setRaw$] = useState(EMPTY);

  useEffect(() => {
    const socket = io("https://yomo.cel-la.store", {
      transports: ["websocket"],
    });

    const raw$ = fromEvent(socket, "receive_sink").pipe(share())
    setRaw$(raw$)

    return () => {
      setRaw$(null);
      return socket.disconnect();
    };
  }, []);

  return (
    <NoiseContext.Provider value={{ noise$: raw$.pipe(feedChart()), lastReading$: raw$ }}>{children}</NoiseContext.Provider>
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
