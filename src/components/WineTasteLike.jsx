import { ScaleRate } from "./ScaleRate";
import { TasteFill } from "./TasteFills";
import tastes from "../assets/json/fill-taste.json";

export function TasteLike(props) {
  const { wine } = props;

  const basedOn = () =>
    `The taste profile of ${wine.winery} ${wine.name} is based on ${wine.reviews.length} user reviews`;

  return (
    <div className="taste-like">
      <h2>What does this wine taste like?</h2>
      <div className="details">
        <ScaleRate wine={wine} />
        <div className="more">
          <h4>Wine lovers taste summary</h4>
          <p>{basedOn()}</p>
        </div>
      </div>
      <TasteFill tastes={tastes} reviews={wine.reviews} />
    </div>
  );
}
