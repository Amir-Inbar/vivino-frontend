import React, { useState } from "react";
import emptyStar from "../assets/imgs/icons/empty-star.svg";
import fullStar from "../assets/imgs/icons/full-star.svg";
import { makeId } from "../services/util.service";

export function StarRate(props) {
  const { rate, total = 5, size = 16, style, isEditable = false, set } = props;
  const box = total * size;
  const [rated, setRated] = useState(rate || total);
  const [varRate, setVarRate] = useState(null);

  const styleStar = { width: size + "px", height: size + "px" };
  const styleFullStar = {
    width: box * ((varRate || rated) / total) + "px",
    marginInlineStart: box * ((varRate || rated) / total) - box + "px",
  };

  const hover = (el) => {
    if (!isEditable) return;
    const { left } = el.target.parentElement.getBoundingClientRect();
    const position = Math.min(el.pageX - left, box);
    setVarRate(Math.max(Math.round(position / (size / 2) + 0.5) / 2, 1));
  };

  const click = () => {
    if (!isEditable) return;
    setRated(varRate);
    set(varRate);
  };

  return (
    <div
      className="stars-container"
      style={style}
      onClick={click}
      onBlur={() => setVarRate(null)}
      onMouseLeave={() => setVarRate(null)}
    >
      <div className="stars" style={{ width: box + "px" }} onMouseMove={hover}>
        {[...Array(total)].map(() => (
          <img
            style={styleStar}
            src={emptyStar}
            key={"EMPTY_STAR_" + makeId()}
          />
        ))}
      </div>
      <div className="stars" style={styleFullStar} onMouseMove={hover}>
        {[...Array(total)].map(() => (
          <img style={styleStar} src={fullStar} key={"FULL_STAR_" + makeId()} />
        ))}
      </div>
    </div>
  );
}
