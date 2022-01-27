import { useEffect, useState } from "react";
import { sentenceToKababCase } from "../services/util.service";
import demoData from "../temp/demo.json";
import { useSelector, useDispatch } from "react-redux";
import { loadWines } from "../store/actions/wineAction";

export const HomePage = () => {
  const [selectColor, setSelectColor] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const { wines } = useSelector((state) => state.wineModule);

  useEffect(() => {
    dispatch(loadWines());
  }, [dispatch]);

  const selectPrice = (priceNum) => {
    setSelectColor(priceNum);
  };

  const onChangePage = (nextPage) => {
    setCurrentPage(nextPage);
  };
  if (!demoData) return <div></div>;
  console.log(currentPage, demoData.wines.length / 4);
  return (
    <section className="primary-wines">
      <div className="primary-top-title">Top lists in your area</div>
      <div className="primary-sub-title">Updated every Thursday</div>
      <div className="price-range-btns flex">
        <button
          className="price-btn low-price"
          onClick={() => selectPrice(1)}
          style={{
            backgroundImage:
              selectColor === 1
                ? `url(${
                    require("../assets/imgs/icons/coinwhite.svg").default
                  })`
                : `url(${require("../assets/imgs/icons/coin.svg").default})`,

            backgroundColor: selectColor === 1 ? "#ba1628" : "",
          }}
        ></button>
        <button
          className="price-btn mid-price"
          onClick={() => selectPrice(2)}
          style={{
            backgroundImage:
              selectColor === 2
                ? `url(${
                    require("../assets/imgs/icons/doublecoinwhite.svg").default
                  })`
                : `url(${
                    require("../assets/imgs/icons/doublecoin.svg").default
                  })`,

            backgroundColor: selectColor === 2 ? "#ba1628" : "",
          }}
        ></button>
        <button
          className="price-btn hi-price"
          onClick={() => selectPrice(3)}
          style={{
            backgroundImage:
              selectColor === 3
                ? `url(${
                    require("../assets/imgs/icons/threecoinwhite.svg").default
                  })`
                : `url(${
                    require("../assets/imgs/icons/threecoin.svg").default
                  })`,

            backgroundColor: selectColor === 3 ? "#ba1628" : "",
          }}
        ></button>
      </div>
      <div className="main-carousel">
        {currentPage * -1 + 1 < demoData.wines.length / 4 ? (
          <div
            className="carousel-control right-control"
            onClick={() => onChangePage(currentPage - 1)}
          >
            <svg viewBox="0 0 7 14">
              <g>
                <path
                  d="M-0.000,13.281 L6.568,7.001 L-0.000,0.722 "
                  fill="none"
                  stroke="#585858"
                  strokeWidth="1"
                ></path>
              </g>
            </svg>
          </div>
        ) : null}
        {currentPage + 2 < demoData.wines.length / 4 ? (
          <div
            className="carousel-control left-control"
            onClick={() => onChangePage(currentPage + 1)}
          >
            <svg style={{ transform: "rotate(180deg)" }} viewBox="0 0 7 14">
              <g>
                <path
                  d="M-0.000,13.281 L6.568,7.001 L-0.000,0.722 "
                  fill="none"
                  stroke="#585858"
                  strokeWidth="1"
                ></path>
              </g>
            </svg>
          </div>
        ) : null}
        <div style={{ overflow: "hidden" }}>
          <div
            className="wines-carousel flex"
            style={{
              transform: `translateX(${currentPage * 100}%)`,
              width: "calc(100% - 10px)",
            }}
          >
            {demoData.wines.map((wine, idx) => (
              <div
                className="wine-card"
                style={{ width: "calc(25% - 16px)" }}
                key={"WINE_" + idx}
              >
                <div className="upper-card flex ">
                  <div className="wine-img hover-wine">
                    <img
                      src={require("../assets/imgs/icons/1wine.png")}
                      alt=""
                    />
                  </div>
                  <div className="main-rating flex column align-center ">
                    <div className="rating wine-title flex column align-center">
                      <div className="avg-rate">4.2</div>
                      <div>stars</div>
                      <div>8183 ratings</div>
                    </div>
                    <div
                      className="wine-title"
                      style={
                        wine.price ? { color: "#046057" } : { color: "#b03000" }
                      }
                    >
                      {wine.price ? wine.price + "$" : "Sold Out"}
                    </div>
                  </div>
                </div>
                <div className="wine-details wine-title ">
                  <p>{wine.winery}</p>
                  <p>{wine.name}</p>
                </div>
                <div className="wine-location flex align-center ">
                  <img
                    src={require(`../assets/imgs/icons/flags/${sentenceToKababCase(
                      wine.country
                    )}.png`)}
                    alt=""
                  />
                  <span>
                    {wine.region}, {wine.country}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
