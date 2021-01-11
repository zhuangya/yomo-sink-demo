import { Line } from "@nivo/line";
import { useObservableState } from "observable-hooks";
import styled from "styled-components";

import { useNoise, useLastReading } from "./NoiseProvider";

const Num = styled.span`
  font-variant-numeric: tabular-nums;
`;

const Wrapper = styled.section`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
function foo(list = []) {
  return [
    {
      id: "noise",
      data: list.map((l, index) => ({ y: l, x: index })),
    },
  ];
}

export default function NoiseChart() {
  const noise$ = useNoise();
  const noiseStream = useObservableState(noise$);

  const lastReading$ = useLastReading();
  const lr = useObservableState(lastReading$);

  if (typeof noiseStream === "undefined") {
    return <pre>'loading'</pre>;
  }

  return (
    <Wrapper>
      <section>实时噪音分贝值： <Num>{lr.toFixed(1)}</Num></section>

      <div style={{ width: "800px", height: "600px" }}>
        <Line
          data={foo(noiseStream)}
          width={800}
          height={600}
          animate={true}
          motionConfig={{
            mass: 2,
            tension: 230,
            friction: 10,
            clamp: true,
          }}
          margin={{
            top: 30,
            right: 80,
            bottom: 30,
            left: 50,
          }}
          curve="stepAfter"
          layers={["lines", "axes", "grid"]}
          xScale={{
            type: "point",
            min: "auto",
            max: "auto",
          }}
          yScale={{
            type: "linear",
            stacked: false,
            min: 20,
            max: 100,
          }}
          enableGridX={false}
          axisLeft={{
            orient: "left",
            tickSize: 0,
            tickPadding: 6,
            tickRotation: 30,
          }}
          axisBottom={{
            orient: "bottom",
            tickSize: 0,
            tickPadding: 6,
            tickRotation: 0,
            format: () => null,
          }}
        />
      </div>
    </Wrapper>
  );
}
