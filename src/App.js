import { NoiseProvider, useNoise } from "./NoiseProvider";
import { useObservableState } from "observable-hooks";

function App() {
  return (
    <NoiseProvider>
      <div className="App">
        <header className="App-header">
          <NoiseDisplay />
        </header>
      </div>
    </NoiseProvider>
  );
}

function NoiseDisplay() {
  const noise$ = useNoise();

  const x = useObservableState(noise$);

  return (
    <pre>
    {
      JSON.stringify(x, null, 2)
    }
    </pre>
  );
}

export default App;
