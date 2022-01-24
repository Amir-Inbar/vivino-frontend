import { useState } from "react";
export const PrimaryWine = () => {
  const [selectColor, setSelectColor] = useState(1);
  const selectPrice = (priceNum) => {
    setSelectColor(priceNum);
  };
  const wines = [1, 2, 3, 4, 5, 6];
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
      <div className="wines-carousel flex">
        <div className="carousel-control">
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
        <div className="wine-card">
          <div className="upper-card flex ">
            <div className="wine-img hover-wine">
              <img src={require("../assets/imgs/icons/1wine.png")} alt="" />
            </div>
            <div className="main-rating flex column align-center ">
              <div className="rating flex column align-center">
                <div className="avg-rate">4.2</div>
                <div>stars</div>
                <div>8183 ratings</div>
              </div>
              <div style={{ color: "#b03000" }}>Sold Out</div>
            </div>
          </div>
          <div className="wine-details">
            <p>Pasqua Vigneti e Cantine</p>
            <p>Desire Lush & Zin</p>
            <p>Primitivo 2018</p>
          </div>
          <div className="wine-location flex align-center ">
            <img src={require("../assets/imgs/icons/flags/italy.png")} alt="" />
            <span>Puglia, Italy</span>
          </div>
        </div>
        <div className="wine-card">
          <div className="upper-card flex ">
            <div className="wine-img hover-wine">
              <img src={require("../assets/imgs/icons/1wine.png")} alt="" />
            </div>
            <div className="main-rating flex column align-center ">
              <div className="rating flex column align-center">
                <div className="avg-rate">4.2</div>
                <div>stars</div>
                <div>8183 ratings</div>
              </div>
              <div style={{ color: "#b03000" }}>Sold Out</div>
            </div>
          </div>
          <div className="wine-details">
            <p>Pasqua Vigneti e Cantine</p>
            <p>Desire Lush & Zin</p>
            <p>Primitivo 2018</p>
          </div>
          <div className="wine-location flex align-center ">
            <img src={require("../assets/imgs/icons/flags/italy.png")} alt="" />
            <span>Puglia, Italy</span>
          </div>
        </div>
        <div className="wine-card">
          <div className="upper-card flex ">
            <div className="wine-img hover-wine">
              <img src={require("../assets/imgs/icons/1wine.png")} alt="" />
            </div>
            <div className="main-rating flex column align-center ">
              <div className="rating flex column align-center">
                <div className="avg-rate">4.2</div>
                <div>stars</div>
                <div>8183 ratings</div>
              </div>
              <div style={{ color: "#b03000" }}>Sold Out</div>
            </div>
          </div>
          <div className="wine-details">
            <p>Pasqua Vigneti e Cantine</p>
            <p>Desire Lush & Zin</p>
            <p>Primitivo 2018</p>
          </div>
          <div className="wine-location flex align-center ">
            <img src={require("../assets/imgs/icons/flags/italy.png")} alt="" />
            <span>Puglia, Italy</span>
          </div>
        </div>
        <div className="wine-card">
          <div className="upper-card flex ">
            <div className="wine-img hover-wine">
              <img src={require("../assets/imgs/icons/1wine.png")} alt="" />
            </div>
            <div className="main-rating flex column align-center ">
              <div className="rating flex column align-center">
                <div className="avg-rate">4.2</div>
                <div>stars</div>
                <div>8183 ratings</div>
              </div>
              <div style={{ color: "#b03000" }}>Sold Out</div>
            </div>
          </div>
          <div className="wine-details">
            <p>Pasqua Vigneti e Cantine</p>
            <p>Desire Lush & Zin</p>
            <p>Primitivo 2018</p>
          </div>
          <div className="wine-location flex align-center ">
            <img src={require("../assets/imgs/icons/flags/italy.png")} alt="" />
            <span>Puglia, Italy</span>
          </div>
        </div>
      </div>
    </section>
  );
};
