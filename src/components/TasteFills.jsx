import React from "react";

export default function TasteFill(props) {
  const { tastes } = props;
  let position = 0;

  function preview() {
    return tastes.slice(position * 3, 3).map((item) => (
      <div className="taste-fill-preview">
        <div className="picture" style={{ color: item.color }}></div>
        <h3>{item.description}</h3>
      </div>
    ));
  }

  return <div className="taste-fill">{preview()}</div>;
}
