import { ScaleRate } from "./ScaleRate";
import { TasteFill } from "./TasteFills";
import tastes from "../assets/json/fill-taste.json";

export function TasteLike(props) {
  const { wine, setTaste } = props;

  return (
    <div className="taste-like">
      <ScaleRate wine={wine} />
      <TasteFill tastes={tastes} reviews={wine.reviews} setTaste={setTaste} />
    </div>
  );
}
