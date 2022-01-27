import React from "react";
import { sentenceToKababCase } from "../services/util.service";

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
    <header
      className="winery-header full"
      style={
        winery.image
          ? {
              background: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,1)), url(${winery.image}) no-repeat center`,
              backgroundSize: "cover",
            }
          : {}
      }
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
          <WineryRating winery={winery} />
          <div className="wines-count">
            <p>Wines</p>
            <p>{winery.wines.length}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
