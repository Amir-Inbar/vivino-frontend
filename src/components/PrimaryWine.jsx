import { useState } from 'react';
// import coin from '../assets/imgs/icons/';
export const PrimaryWine = () => {
  // const SVG = require.content('../assets/imgs/icons', true, /\.svg$/);
  // console.log(SVG);
  const [selectColor, setSelectColor] = useState(0);

  const selectPrice = (priceNum) => {
    setSelectColor(priceNum);
  };

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
                ? require('../assets/imgs/icons/coin.svg')
                : require('../assets/imgs/icons/coinwhite.svg'),
          }}
        ></button>
        <button
          className="price-btn mid-price"
          onClick={() => selectPrice(2)}
        ></button>
        <button
          className="price-btn hi-price"
          onClick={() => selectPrice(3)}
        ></button>
      </div>
    </section>
  );
};
