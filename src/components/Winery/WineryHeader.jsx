import React from "react";
import { sentenceToKababCase, tryRequire } from "../../services/util.service";

export function WineryHeader(props) {
  const { winery } = props;

  const WineryMap = ({ winery }) => {
    return (
      <div className="winery-map">
        {winery.lat && winery.lng ? (
          <iframe
            src={`https://maps.google.com/maps?q=${winery.lat},${winery.lng}&t=&z=10&ie=UTF8&iwloc=&output=embed`}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen="0"
          ></iframe>
        ) : null}
      </div>
    );
  };

  const WineryRating = ({ winery }) => {
    return winery.rate || winery.ratings ? (
      <div className="average-rate">
        <p>Average Rating</p>
        <p className="rate">
          {winery.rate ? <span>{winery.rate.toFixed(1)} </span> : null}
          {winery.ratings ? <span>({winery.ratings} Ratings)</span> : null}
        </p>
      </div>
    ) : null;
  };

  return (
    <header className="winery-header full">
      <div className="cover" />
      {winery.image ? <img className="cover" src={winery.image} /> : null}
      <WineryMap winery={winery} />
      <div className="winery-information fit-media">
        <p className="title">Winery</p>
        <h1 className="name">{winery.name}</h1>
        <div className="country">
          <img
            src={tryRequire(
              `imgs/icons/flags/${sentenceToKababCase(winery.country)}.png`,
              `imgs/icons/flags/other.png`
            )}
          />
          <p>
            {winery.region}, {winery.country}
          </p>
        </div>
        <div className="more-information">
          <WineryRating winery={winery} />
          <div className="wines-count">
            <p>Wines</p>
            <p>{winery.wines}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
