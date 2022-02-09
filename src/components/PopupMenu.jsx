import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { kababCaseToSentence } from "../services/util.service";
import { mediaQuery } from "./AppHeader";

export function PopupMenu(props) {
  const rtl = document.dir === "rtl";
  const { config, close } = props;
  const history = useHistory();
  const { keywords } = useSelector((state) => state.wineModule);
  const [menus, setMenu] = useState({});

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
          ...keywords.data["wine styles"]
            .filter(({ type }) => type === "red")
            .map(({ name, seo }) => ({
              title: name,
              img: "",
              seo,
              path: `/wine?style=${seo}`,
            })),
        ],
        [
          { title: "White", path: "/wine?type=white", img: "", isBold: true },
          ...keywords.data["wine styles"]
            .filter(({ type }) => type === "white")
            .map(({ name, seo }) => ({
              title: name,
              img: "",
              seo,
              path: `/wine?style=${seo}`,
            })),
        ],
        [
          ...keywords.data["wine type"]
            .filter(({ name }) => name !== "red" && name !== "white")
            .map(({ name }) => ({
              title: kababCaseToSentence(name),
              path: `/wine?type=${name}`,
              img: "",
              isBold: true,
            })),
        ],
      ],
    };
    setMenu({ ...menus, [name]: data });
  };

  useEffect(() => {
    if (!keywords) return;
    addTable("wines");
  }, [keywords]);

  if (!config || !menus) return null;

  const isMobile = window.innerWidth < mediaQuery.mobile;

  const top = () =>
    isMobile ? 0 : config.target.offsetTop + config.target.clientHeight + 8;
  const left = () => (isMobile ? 0 : config.target.offsetLeft - 20);
  const right = () =>
    isMobile
      ? 0
      : window.innerWidth -
        (config.target.offsetLeft + config.target.clientWidth + 20);

  const tableRender = () => {
    const menu = menus[config.type];
    return menu.table.map((data, idx1) => {
      return data.length > 0 ? (
        <ul key={"MENU_" + idx1}>
          {data.map((cell, idx2) => {
            return (
              <li
                className={cell.isBold ? `bold` : ""}
                key={"SUBMENU_" + idx1 + "_" + idx2}
                onClick={() => history.push(cell.path)}
              >
                {cell.img ? <img src={cell.img} /> : null}
                <span data-trans={cell.seo}>{cell.title}</span>
              </li>
            );
          })}
        </ul>
      ) : null;
    });
  };

  const position = rtl
    ? { top: `${top()}px`, right: `${right()}px` }
    : { top: `${top()}px`, left: `${left()}px` };

  return (
    <div
      className="background-dimm"
      onClick={close}
      style={
        !isMobile
          ? { height: document.documentElement.scrollHeight + "px" }
          : null
      }
    >
      <div className="popup-menu hover-box" style={position}>
        {tableRender("wines")}
      </div>
    </div>
  );
}
