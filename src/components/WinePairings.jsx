import React, { useEffect, useState } from "react";
import { getUnsplash } from "../services/media.service";
import {
  kababCaseToSentence,
  sentenceToKababCase,
  tryRequire,
} from "../services/util.service";

export const WinePairings = (props) => {
  const { wine } = props;
  const [pair, setPair] = useState(null);

  useEffect(() => console.log(pair), [pair]);

  // const getPhoto = async () => {
  //   if (pair) return;
  //   const res = await Promise.all(
  //     wine.pairings.split("|").map(async (food) => {
  //       const photo = await getUnsplash("meal food " + food);
  //       const data = photo.data?.results[0];
  //       const src = data?.urls?.thumb;
  //       return <img src={src} key={data.id} />;
  //     })
  //   );
  //   setPair(res);
  // };
  // getPhoto();

  const FoodPairing = ({ wine }) => {
    return wine.pairings.split("|").map((food, idx) => (
      <div className="meal" key={"FOOD_PAIR_" + idx}>
        <img
          src={require(`../assets/imgs/food/${sentenceToKababCase(food)}.jpg`)}
        />
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
            Our wine experts think this <span>{wine.style || wine.name}</span>{" "}
            wine would be a match made in heaven with these dishes.
          </p>
        </div>
        <img src={wine.image} />
      </div>
      <div className="meals">
        <FoodPairing wine={wine} />
      </div>
      {/* {pair} */}
    </section>
  ) : null;
};
