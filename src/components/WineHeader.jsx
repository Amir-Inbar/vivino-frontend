import { StarRate } from "./StarRate";
import { useHistory } from "react-router-dom";

export function WineHeader(props) {
  const { wine } = props;
  const history = useHistory();

  console.log(wine);

  const keywords = () => {
    const grapes = wine.grapes
      ? wine.grapes.split("|").map((grape) =>
          grape
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        )
      : null;
    return [wine.country, wine.region, wine.type, grapes].map(
      (keyword, idx) => {
        return keyword ? (
          <a className="tag" key={"KEYWORD_" + idx}>
            {keyword}
          </a>
        ) : null;
      }
    );
  };

  const WineRate = ({ wine }) => {
    const { rate, ratings } = wine;
    return rate && ratings ? (
      <div className="rate">
        <div className="avg">{rate.toFixed(1)}</div>
        <div className="more-info">
          <StarRate rate={rate} />
          <div className="num-ratings">{wine.ratings} ratings</div>
        </div>
      </div>
    ) : null;
  };

  return (
    <section className="wine-header full">
      <div className="information fit-media">
        <div className="picture">
          <img src={wine.image} alt={wine.name} />
        </div>
        <div className="content">
          <h2 onClick={() => history.push(`/winery/${wine.wineryId}`)}>
            {wine.winery}
          </h2>
          <h1>
            {wine.name} {wine.vintage}
          </h1>
          <div className="tags">{keywords()}</div>
          <WineRate wine={wine} />
        </div>
      </div>
    </section>
  );
}
