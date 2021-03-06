import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  getCurrentPosition,
  sentenceToKababCase,
  tryRequire,
} from "../../services/util.service";
import { wineryService } from "../../services/winery.service";

export function WineryPreview({ wine }) {
  const history = useHistory();
  const [winery, setWinery] = useState(null);

  useEffect(async () => {
    if (wine?.wineryId) {
      const location = await getCurrentPosition();
      const winery = await wineryService.getById(wine.wineryId, {
        ...location,
      });
      setWinery(winery);
    }
  }, [wine]);

  return winery?.overview ? (
    <section className="winery-preview hover-box">
      <section className="information">
        <h2>{winery.name}</h2>
        <div className="country">
          <img
            src={tryRequire(
              `imgs/icons/flags/${sentenceToKababCase(winery.country)}.png`,
              `imgs/icons/flags/other.png`
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
