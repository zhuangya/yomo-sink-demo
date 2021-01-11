import { NoiseProvider } from "./NoiseProvider";

import NoiseChart from "./NoiseChart";

function App() {
  return (
    <NoiseProvider>
      <NoiseChart />
    </NoiseProvider>
  );
}

export default App;
