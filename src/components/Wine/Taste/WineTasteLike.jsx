import { ScaleRate } from "./WineScaleRate";
import { TasteFill } from "./WineTasteFills";

export function TasteLike(props) {
  const { wine } = props;
  return (
    <section className="taste-like">
      <ScaleRate wine={wine} />
      <TasteFill tastes={wine.tastes} />
    </section>
  );
}
