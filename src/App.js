import "./App.css";
import { NoiseProvider, useNoise } from "./NoiseProvider";

function App() {
  return (
    <NoiseProvider>
      <div className="App">
        <header className="App-header">
          <NoiseDisplay />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </NoiseProvider>
  );
}

function NoiseDisplay() {
  const x = useNoise();

  return <pre>noise: [ {JSON.stringify(x, null, 2)} ]</pre>;
}

export default App;
