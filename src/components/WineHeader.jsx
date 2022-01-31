import { StarRate } from "./StarRate";
import { useHistory } from "react-router-dom";
import { tryRequire } from "../services/util.service";

export function WineHeader(props) {
  const { wine } = props;
  const history = useHistory();

  const keywords = () => {
    return [wine.country, wine.region, wine.type, ...wine.grapes].map(
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
          <img
            src={wine.image ? wine.image : tryRequire("imgs/bottle.png")}
            alt={wine.name}
          />
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
