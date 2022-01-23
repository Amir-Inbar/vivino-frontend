import { StarRate } from "./StarRate";

export function WineHeader(props) {
  const { wine } = props;

  const keywords = () => {
    return [
      wine.country,
      wine.region,
      wine.winery,
      wine.type,
      ...wine.grapes.map((grape) =>
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

  const rate = () => {
    const rate = wine.reviews
      .reduce(
        (sum, review) =>
          sum && review.rate
            ? (sum = (sum + review.rate) / 2)
            : (sum = review.rate),
        0
      )
      .toFixed(1);
    return rate;
  };

  return (
    <div className="top-section full">
      <div className="picture">
        <img src="//images.vivino.com/thumbs/B8ukZ0TdRb2r9pLFD9cSNg_pb_x600.png" />
      </div>
      <div className="content">
        <h2>{wine.winery}</h2>
        <h1>
          {wine.name} {wine.vintage}
        </h1>
        <div className="tags">{keywords()}</div>
        <div className="rate">
          <div className="avg">{rate()}</div>
          <div className="more-info">
            <StarRate rate={rate()} />
            <div className="num-ratings">94 ratings</div>
          </div>
        </div>
      </div>
    </div>
  );
}
