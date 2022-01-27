import { StarRate } from "./StarRate";

export function WineHeader(props) {
  const { wine } = props;

  console.log(wine);

  const keywords = () => {
    return [
      wine.country,
      wine.region,
      wine.winery.name || wine.winery,
      wine.type,
      ...wine.grapes.split("|").map((grape) =>
        grape
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      ),
    ].map((keyword, idx) => (
      <a className="tag" key={"KEYWORD_" + idx}>
        {keyword}
      </a>
    ));
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
    <div className="wine-header full">
      <div className="information fit-media">
        <div className="picture">
          <img src={wine.image} />
        </div>
        <div className="content">
          <h2>{wine.winery}</h2>
          <h1>
            {wine.name} {wine.vintage}
          </h1>
          <div className="tags">{keywords()}</div>
          <WineRate wine={wine} />
        </div>
      </div>
    </div>
  );
}
