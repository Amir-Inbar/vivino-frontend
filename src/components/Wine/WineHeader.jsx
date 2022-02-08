import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  kababCaseToSentence,
  sentenceToKababCase,
  tryRequire,
} from "../../services/util.service";
import { WineRate } from "./Review/WineRatePreview";

export function WineHeader(props) {
  const { wine } = props;
  const history = useHistory();
  const keywords = useSelector((state) => state.wineModule.keywords);

  const WineTags = () => {
    const map = [
      {
        title: wine.country,
        path: `/wine?country=${wine.country.toLowerCase()}`,
      },
      { title: wine.region, path: `/wine?region=${wine.region.toLowerCase()}` },
      ...(wine.grapes || []).map((grape) => {
        const name = keywords?.grapes?.find((g) => g.seo === grape)?.name;
        return {
          title: name || kababCaseToSentence(grape),
          path: `/wine?grapes=${grape}`,
        };
      }),
    ];
    return (
      <div className="tags">
        {map.map((keyword, idx) => {
          return (
            <span
              onClick={() => history.push(keyword.path)}
              className="tag"
              key={"KEYWORD_" + idx}
              data-trans={sentenceToKababCase(keyword.title)}
            >
              {keyword.title}
            </span>
          );
        })}
      </div>
    );
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
          <h2
            onClick={() =>
              history.push(`/winery/${sentenceToKababCase(wine.winery)}`)
            }
          >
            {wine.winery}
          </h2>
          <h1>
            {wine.name} {wine.vintage}
          </h1>
          <WineTags />
          <WineRate rate={wine.rate} ratings={wine.ratings} />
        </div>
      </div>
    </section>
  );
}
