import { StarRate } from "./StarRate";
import { useHistory } from "react-router-dom";
import { kababCaseToSentence, tryRequire } from "../services/util.service";
import { WineRate } from "./WineRatePreview";

export function WineHeader(props) {
  const { wine } = props;
  const history = useHistory();

  const keywords = () => {
    const linkMap = [
      {
        title: wine.country,
        path: `/wine?country=${wine.country.toLowerCase()}`,
      },
      { title: wine.region, path: `/wine?region=${wine.region.toLowerCase()}` },
      ...(wine.grapes || []).map((grape) => ({
        title: kababCaseToSentence(grape),
        path: `/wine?grapes=${grape}`,
      })),
    ];
    return linkMap.map((keyword, idx) => {
      return keyword ? (
        <span
          onClick={() => history.push(keyword.path)}
          className="tag"
          key={"KEYWORD_" + idx}
          data-trans={keyword.title.toLowerCase()}
        >
          {keyword.title}
        </span>
      ) : null;
    });
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
          <WineRate rate={wine.rate} ratings={wine.ratings} />
        </div>
      </div>
    </section>
  );
}
