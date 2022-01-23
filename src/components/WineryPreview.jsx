import React from "react";

export function WineryPreview(props) {
  const { winery } = props;
  return winery.id ? (
    <section className="winery-preview">
      <section className="information">
        <h2>{winery.name}</h2>
        <p className="country">{winery.country}</p>
        <p className="short-description">{winery.overview}</p>
        <button>Read more</button>
      </section>
      <section className="image">
        <img src={winery.image} />
        {winery.logo ? <img className="logo" src={winery.logo} /> : null}
      </section>
    </section>
  ) : null;
}
