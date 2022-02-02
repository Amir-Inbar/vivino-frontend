import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { kababCaseToSentence } from "../services/util.service";

export function PopupMenu(props) {
  const { config, close } = props;
  const history = useHistory();
  const { keywords } = useSelector((state) => state.wineModule);
  const [menus, setMenu] = useState({});

  const top = () => config.target.offsetTop + config.target.clientHeight + 8;
  const left = () => config.target.offsetLeft - 20;

  const addTable = (name) => {
    const data = {
      table: [
        [
          {
            title: "Red",
            path: "/wine?type=red",
            img: "",
            isBold: true,
          },
          ...keywords.styles
            .filter(({ type }) => type === "red")
            .map(({ seo }) => ({
              title: kababCaseToSentence(seo),
              img: "",
              path: `/wine?style=${seo}`,
            })),
        ],
        [
          { title: "White", path: "/wine?type=white", img: "", isBold: true },
          ...keywords.styles
            .filter(({ type }) => type === "white")
            .map(({ seo }) => ({
              title: kababCaseToSentence(seo),
              img: "",
              path: `/wine?style=${seo}`,
            })),
        ],
        [
          ...keywords.types
            .filter((type) => type !== "red" && type !== "white")
            .map((type) => ({
              title: kababCaseToSentence(type),
              path: `/wine?type=${type}`,
              img: "",
              isBold: true,
            })),
        ],
      ],
    };
    setMenu({ ...menus, [name]: data });
  };

  useEffect(() => console.log(menus), [menus]);

  useEffect(() => {
    if (!keywords) return;
    addTable("wines");
  }, [keywords]);

  const tableRender = () => {
    const menu = menus[config.type];
    return menu.table.map((data, idx1) => {
      return data.length > 1 ? (
        <ul key={"MENU_" + idx1}>
          {data.map((cell, idx2) => {
            return (
              <li
                className={cell.isBold ? `bold` : ""}
                key={"SUBMENU_" + idx1 + "_" + idx2}
                onClick={() => history.push(cell.path)}
              >
                {cell.img ? <img src={cell.img} /> : null}
                <span>{cell.title}</span>
              </li>
            );
          })}
        </ul>
      ) : null;
    });
  };

  return config && menus ? (
    <div className="background-dimm" onClick={close}>
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
