import React from "react";
import { sentenceToKababCase } from "../services/util.service";

export function WineryHeader(props) {
  const { winery, wines, reviews, rate } = props;

  function WineryMap({ winery }) {
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
  }

  return (
    <header
      className="winery-header full"
      style={{
        background: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,1)), url(${winery.image}) no-repeat center`,
        backgroundSize: "cover",
      }}
    >
      <WineryMap winery={winery} />
      <div className="winery-information fit-media">
        <p className="title">Winery</p>
        <h1 className="name">{winery.name}</h1>
        <div className="country">
          <img
            src={require(`../assets/imgs/icons/flags/${sentenceToKababCase(
              winery.country
            )}.png`)}
          />
          <p>
            {winery.region}, {winery.country}
          </p>
        </div>
        <div className="more-information">
          <div className="average-rate">
            <p>Average Rating</p>
            <p className="rate">
              <span>{rate}</span> <span>({reviews.length} Ratings)</span>
            </p>
          </div>
          <div className="wines-count">
            <p>Wines</p>
            <p>{wines.length}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
