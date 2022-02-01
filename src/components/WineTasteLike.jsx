import { ScaleRate } from "./ScaleRate";
import { TasteFill } from "./TasteFills";

export function TasteLike(props) {
  const { wine } = props;
  return (
    <section className="taste-like">
      <ScaleRate wine={wine} />
      <TasteFill tastes={wine.tastes} />
    </section>
  );
}
