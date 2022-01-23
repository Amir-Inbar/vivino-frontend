import React, { useEffect, useState } from "react";

export default function TasteFill(props) {
  const { tastes, reviews } = props;
  const [position, setPosition] = useState(0);

  useEffect(() => {
    preview();
  }, [position]);

  const preview = () => {
    const start = Math.min(position * 3, tastes.length - 3);
    return tastes.slice(start, start + 3).map((item) => (
      <div className="taste-fill-preview">
        <div className="picture" style={{ backgroundColor: item.color }}></div>
        <h3>{item.description}</h3>
        <p>
          mentions of <span style={{ color: item.color }}>{item.name}</span>{" "}
          notes
        </p>
      </div>
    ));
  };

  return (
    <div className="taste-fill">
      {tastes.length > position * 3 + 3 ? (
        <button className="next" onClick={() => setPosition(position + 1)}>
          -
        </button>
      ) : null}
      {position ? (
        <button className="prev" onClick={() => setPosition(position - 1)}>
          -
        </button>
      ) : null}
      {preview()}
    </div>
  );
}
