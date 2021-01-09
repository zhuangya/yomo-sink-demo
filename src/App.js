import { useMemo } from "react";
import { NoiseProvider, useNoise } from "./NoiseProvider";
import { useObservableState } from "observable-hooks";
import { Chart, curveBundle } from "react-charts";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function App() {
  return (
    <NoiseProvider>
      <NoiseDisplay />
    </NoiseProvider>
  );
}

function NoiseDisplay() {
  const noise$ = useNoise();
  const noiseStream = useObservableState(noise$);
  const series = useMemo(() => ({ showPoints: false, curve: curveBundle }), []);
  const axes = useMemo(
    () => [
      { primary: true, type: "time", show: true, position: "bottom" },
      { type: "linear", position: "left", hardMin: 0, hardMax: 180 },
    ],
    []
  );

  const data = useMemo(() => noiseStream || [], [noiseStream]);

  return (
    <Wrapper>
      <h1>YoMo</h1>

      <div style={{ width: "800px", height: "600px" }}>
        <Chart data={data} series={series} axes={axes} />
      </div>
    </Wrapper>
  );
}

export default App;
