import React, { useState } from "react";
import emptyStar from "../assets/imgs/icons/empty-star.svg";
import fullStar from "../assets/imgs/icons/full-star.svg";
import { makeId } from "../services/util.service";

export function StarRate(props) {
  const rtl = document.dir === "rtl";
  const { rate: inRate, total = 5, size = 16, isEditable = false, set } = props;
  const box = total * size;
  const [rate, setRate] = useState(inRate || total);
  const [tempRate, setTempRate] = useState(null);

  const style = isEditable ? { cursor: "pointer" } : {};
  const styleStar = { width: size + "px", height: size + "px" };
  const styleEmptyStar = { width: box + "px", ...style };
  const styleFullStar = {
    width: box,
    clipPath: `inset(0 ${box - box * ((tempRate || rate) / total)}px 0 0)`,
    // width: box * ((tempRate || rate) / total) + "px",
    // marginInlineStart: box * ((tempRate || rate) / total) - box + "px",
    ...style,
  };

  const hover = (ev, isTouch) => {
    if (!isEditable) return;
    const x = isTouch ? ev.touches[0].clientX : ev.pageX;
    const { left, right, width } =
      ev.target.parentElement.getBoundingClientRect();
    const position = Math.min(rtl ? width - (right - x) : x - left, box);
    setTempRate(Math.max(Math.round(position / (size / 2) + 0.5) / 2, 1));
  };

  const click = () => {
    if (!isEditable) return;
    setRate(tempRate);
    set(tempRate);
  };

  return (
    <div
      className="stars-container"
      onClick={click}
      onBlur={() => setTempRate(null)}
      onMouseLeave={() => setTempRate(null)}
    >
      <div
        className="stars"
        style={styleEmptyStar}
        onMouseMove={hover}
        onTouchMove={(ev) => hover(ev, true)}
      >
        {[...Array(total)].map(() => (
          <img
            style={styleStar}
            src={emptyStar}
            key={"EMPTY_STAR_" + makeId()}
          />
        ))}
      </div>
      <div
        className="stars"
        style={styleFullStar}
        onMouseMove={hover}
        onTouchMove={(ev) => hover(ev, true)}
      >
        {[...Array(total)].map(() => (
          <img style={styleStar} src={fullStar} key={"FULL_STAR_" + makeId()} />
        ))}
      </div>
    </div>
  );
}
