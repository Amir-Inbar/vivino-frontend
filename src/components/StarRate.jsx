import React from "react";
import emptyStar from "../assets/imgs/icons/empty-star.svg";
import fullStar from "../assets/imgs/icons/full-star.svg";

export function StarRate(props) {
  const { rate, total = 5, size = total * 16.5, style } = props;
  const width = (size * (rate || total)) / total;
  return (
    <div className="stars-container" style={style}>
      <div className="stars" style={{ width: size + "px" }}>
        {[...Array(total)].map((el, idx) => (
          <img src={emptyStar} key={"EMPTY_STAR_" + idx} />
        ))}
      </div>
      <div
        className="stars"
        style={{ width: width + "px", marginInlineStart: width - size + "px" }}
      >
        {[...Array(total)].map((el, idx) => (
          <img src={fullStar} key={"FULL_STAR_" + idx} />
        ))}
      </div>
    </div>
  );
}
