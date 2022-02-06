import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { tryRequire } from "../../../services/util.service";
import { setFilterBy } from "../../../store/actions/wineAction";

export const WinePairings = (props) => {
  const dispatch = useDispatch();
  const keywords = useSelector((state) => state.wineModule.keywords);
  const { wine } = props;
  const history = useHistory();

  const FoodPairing = ({ wine }) =>
    wine.pairings.map((seo, idx) => {
      const name = keywords?.food?.find((val) => val.seo === seo)?.name;
      const goTo = () => {
        dispatch(setFilterBy({ inPairings: seo }));
        history.push(`/wine?pairings=${seo}`);
      };
      return (
        <div onClick={goTo} className="meal" key={"FOOD_PAIR_" + idx}>
          <div className="image-container">
            <img src={tryRequire(`imgs/food/${seo}.jpg`)} />
          </div>
          <h3 data-trans={seo}>{name}</h3>
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
        <img
          src={wine.image}
          onError={({ target }) => (target.style.visibility = "hidden")}
        />
      </div>
      <div className="meals">
        <FoodPairing wine={wine} />
      </div>
    </section>
  ) : null;
};
