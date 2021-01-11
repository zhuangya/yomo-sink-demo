import { Line } from "@nivo/line";
import { useObservableState } from "observable-hooks";

import { useNoise } from "./NoiseProvider";

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

  if (typeof noiseStream === "undefined") {
    return <pre>'loading'</pre>;
  }

  return (
    <Line
      data={foo(noiseStream)}
      width={800}
      height={600}
      animate={true}
      motionConfig='slow'
      margin={{
        top: 30,
        right: 80,
        bottom: 30,
        left: 50,
      }}
      layers={["lines", "axes", "grid"]}
      xScale={{
        type: "point",
        min: "auto",
        max: "auto",
      }}
      yScale={{
        type: "linear",
        stacked: false,
        min: 0,
        max: 120,
      }}
      yFormat=">-.2"
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
  );
}
