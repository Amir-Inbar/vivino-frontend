import React from "react";

export function PopupMenu(props) {
  const { config } = props;

  const top = () => config.target.offsetTop + config.target.clientHeight + 8;
  const left = () => config.target.offsetLeft - 20;

  return config ? (
    <div
      className="popup-menu"
      style={{ top: `${top()}px`, left: `${left()}px` }}
    >
      test
    </div>
  ) : (
    ""
  );
}
