import React, { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortBy } from "../../store/actions/wineAction";

export const FilterQuickSort = () => {
  const dispatch = useDispatch();
  const elButton = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const sort = useSelector((state) => state.wineModule.sort);

  const SortMenu = ({ isActive, el, close }) => {
    const top = el?.offsetTop + el?.clientHeight + 16;
    const width = Math.max(el?.clientWidth || 0, 150);
    const right = window.innerWidth - (el?.offsetLeft + el?.clientWidth);
    const height = document.documentElement.scrollHeight;
    const options = [
      { title: "rate" },
      { title: "popular", key: "ratings" },
      { title: "recent", key: "_id" },
    ];
    const position = (type) => {
      const index = Object.keys(sort).findIndex((val) => val === type) + 1;
      return index ? <span>{index}</span> : null;
    };
    const style = (type) => {
      switch (sort[type]) {
        case 0:
          return "down";
        case 1:
          return "up";
        default:
          return null;
      }
    };
    return isActive ? (
      <div
        className="background-dimm"
        style={{ height: height + "px" }}
        onClick={close}
      >
        <div
          onClick={(ev) => ev.stopPropagation()}
          className="quick-sort hover-box"
          style={{ top: `${top}px`, right: `${right}px`, width: `${width}px` }}
        >
          {options.map(({ title, key }, idx) => (
            <button
              key={`SORT_BUTTON_${idx}`}
              onClick={() => toggleSelect(key || title)}
              className={style(key || title)}
            >
              {title || key}
              {position(key || title)}
            </button>
          ))}
        </div>
      </div>
    ) : null;
  };

  const isSorted = () => sort && Object.keys(sort).length;

  const toggleSelect = (type) => {
    const sorting = sort[type];
    if (sorting == null) {
      dispatch(setSortBy({ ...sort, [type]: 0 }));
    } else if (sorting == 0) {
      dispatch(setSortBy({ ...sort, [type]: 1 }));
    } else {
      dispatch(setSortBy({ ...sort, [type]: null }));
    }
  };

  return (
    <>
      <button
        ref={elButton}
        onClick={() => setIsActive(!isActive)}
        className={`sort-button ${isActive || isSorted() ? "marked" : ""}`}
        style={isActive ? { zIndex: 100 } : null}
      >
        sort
      </button>
      <SortMenu
        isActive={isActive}
        el={elButton.current}
        close={() => setIsActive(false)}
      />
    </>
  );
};
