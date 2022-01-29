import React from "react";
import { useHistory } from "react-router-dom";
import { sentenceToKababCase, tryRequire } from "../services/util.service";

export function WineryPreview(props) {
  const { winery } = props;
  const history = useHistory();
  return winery?.overview ? (
    <section className="winery-preview">
      <section className="information">
        <h2>{winery.name}</h2>
        <div className="country">
          <img
            src={tryRequire(
              `imgs/icons/flags/${sentenceToKababCase(winery.country)}.png`
            )}
          />
          <p>{winery.country}</p>
        </div>
        <p className="short-description">{winery.overview}</p>
        <button
          className="more"
          onClick={() => history.push(`/winery/${winery._id}`)}
        >
          Read more
        </button>
      </section>
      <section className="image">
        <img src={winery.image} />
        {winery.logo ? <img className="logo" src={winery.logo} /> : null}
      </section>
    </section>
  ) : null;
}
