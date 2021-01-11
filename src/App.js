import { useMemo } from "react";
import { NoiseProvider, useNoise, useLastReading } from "./NoiseProvider";
import { useObservableState } from "observable-hooks";
import { Chart, curveBundle } from "react-charts";

import NoiseChart from "./NoiseChart";

function App() {
  return (
    <NoiseProvider>
      <NoiseChart />
    </NoiseProvider>
  );
}

export default App;
