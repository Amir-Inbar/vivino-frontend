import React, { useEffect, useState } from "react";
import { sentenceToKababCase, tryRequire } from "../services/util.service";

export const WinePairings = (props) => {
  const { wine } = props;

  const FoodPairing = ({ wine }) => {
    return wine.pairings.map((food, idx) => (
      <div className="meal" key={"FOOD_PAIR_" + idx}>
        <img src={tryRequire(`imgs/food/${sentenceToKababCase(food)}.jpg`)} />
        <h3>{food}</h3>
      </div>
    ));
  };

  return wine.pairings ? (
    <section className="wine-pairings">
      <div className="information">
        <div className="content">
          <h2>Food that goes well with this wine</h2>
          <p>
            Our team of wine experts thinks this
            <span> {wine.style || wine.name} </span>
            would be a perfect match with these dishes.
          </p>
        </div>
        <img src={wine.image} />
      </div>
      <div className="meals">
        <FoodPairing wine={wine} />
      </div>
    </section>
  ) : null;
};
