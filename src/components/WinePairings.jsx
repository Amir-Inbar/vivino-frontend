import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { tryRequire } from "../services/util.service";

export const WinePairings = (props) => {
  const { keywords } = useSelector((state) => state.wineModule);
  const { wine } = props;
  const history = useHistory();

  const FoodPairing = ({ wine }) =>
    wine.pairings.map((seo, idx) => {
      const name = keywords.food.find((val) => val.seo === seo)?.name;
      return (
        <div
          onClick={() => history.push(`/wine?pairings=${seo}`)}
          className="meal"
          key={"FOOD_PAIR_" + idx}
        >
          <img src={tryRequire(`imgs/food/${seo}.jpg`)} />
          <h3>{name}</h3>
        </div>
      );
    });

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
