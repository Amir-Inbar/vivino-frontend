import { useLayoutEffect, useState } from "react";
import { WineSlider } from "../components/Wine/WineSlider";
import { tryRequire } from "../services/util.service";
import { wineService } from "../services/wine.service";

export const HomePage = () => {
  const [priceRange, setPriceRange] = useState(1);
  const [wines, setWines] = useState(null);

  useLayoutEffect(() => {
    (async () => {
      try {
        const wines = await wineService.query();
        console.log(wines);
        setWines(wines);
      } catch {}
    })();
  }, []);

  if (!wines) return null;

  const PriceRangeSwitcher = () => {
    const total = 3;
    return (
      <div className="price-range">
        {[...Array(total)].map((el, idx) => (
          <button
            onClick={() => setPriceRange(idx + 1)}
            className={`price-btn ${priceRange === idx + 1 ? "selected" : ""}`}
            key={`PRICE_RATE_BUTTON_${idx}`}
          >
            <img src={tryRequire(`imgs/icons/coins/coinwhite${idx + 1}.svg`)} />
          </button>
        ))}
      </div>
    );
  };

  return (
    <section className="primary-wines">
      <h1>Top rated in your area</h1>
      {/* <PriceRangeSwitcher /> */}
      <WineSlider wines={wines?.data} />
    </section>
  );
};
