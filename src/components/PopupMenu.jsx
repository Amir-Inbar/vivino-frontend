import React from "react";

export function PopupMenu(props) {
  const { config, close } = props;

  const top = () => config.target.offsetTop + config.target.clientHeight + 8;
  const left = () => config.target.offsetLeft - 20;

  const menus = {
    wines: {
      table: [
        [
          { title: "Red", path: "", img: "", isBold: true },
          { title: "Southern Italy Red", path: "", img: "" },
          { title: "Tuscan Red", path: "", img: "" },
          { title: "Spanish Rioja Red", path: "", img: "" },
          { title: "South African Pionotage", path: "", img: "" },
          { title: "Italian Amarone", path: "", img: "" },
        ],
        [
          { title: "White", path: "", img: "", isBold: true },
          { title: "German Riesling", path: "", img: "" },
          { title: "Northern Italy White", path: "", img: "" },
          { title: "German Sauvignon Blanc", path: "", img: "" },
          { title: "German Grauburgunder", path: "", img: "" },
          { title: "New Zealand Sauvignon Blanc", path: "", img: "" },
        ],
        [
          { title: "Sparkling", path: "", img: "", isBold: true },
          { title: "Rose", path: "", img: "", isBold: true },
          { title: "Port", path: "", img: "", isBold: true },
          { title: "Dessert", path: "", img: "", isBold: true },
        ],
      ],
    },
  };

  const tableRender = () => {
    const menu = menus[config.type];
    return menu.table.map((data, idx1) => {
      return (
        <ul key={"MENU_" + idx1}>
          {data.map((cell, idx2) => {
            return (
              <li
                className={cell.isBold ? `bold` : ""}
                key={"SUBMENU_" + idx1 + "_" + idx2}
              >
                <a href={cell.path}>
                  {cell.img ? <img src={cell.img} /> : null}
                  <span>{cell.title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      );
    });
  };

  return config ? (
    <div class="background-dimm" onClick={close}>
      <div
        className="popup-menu"
        style={{ top: `${top()}px`, left: `${left()}px` }}
      >
        {tableRender("wines")}
      </div>
    </div>
  ) : (
    ""
  );
}
