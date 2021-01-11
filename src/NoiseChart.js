import { useObservableState } from "observable-hooks";
import { Num } from "./ui";
import cx from "classnames";

import { useLastReading } from "./NoiseProvider";

export default function NoiseChart() {
  const lastReading$ = useLastReading();

  const lr = useObservableState(lastReading$, () => ["n/a", "n/a"]);

  return (
    <section>
      实时噪音分贝值：
      <Num className={cx({ glow: lr[0] !== lr[1] })}>{lr[1]}</Num>
    </section>
  );
}
