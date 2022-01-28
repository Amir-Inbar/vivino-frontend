import { ScaleRate } from "./ScaleRate";
import { TasteFill } from "./TasteFills";

export function TasteLike(props) {
  const { wine, setTaste } = props;
  return (
    <div className="taste-like">
      <ScaleRate wine={wine} />
      <TasteFill tastes={wine.tastes} setTaste={setTaste} />
    </div>
  );
}
