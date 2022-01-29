import { useEffect, useState } from 'react';
import { sentenceToKababCase } from '../services/util.service';
import demoData from '../temp/demo.json';
import { useSelector, useDispatch } from 'react-redux';
import { loadWines } from '../store/actions/wineAction';

export const HomePage = () => {
  const [selectColor, setSelectColor] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const { wines } = useSelector((state) => state.wineModule);

  const widthScreen = window.innerWidth;

  useEffect(() => {
    dispatch(loadWines());
  }, [dispatch]);

  const selectPrice = (priceNum) => {
    setSelectColor(priceNum);
  };

  const priceRangeBtns = () => {
    const total = 3;
    const classNames = ['low-price', 'mid-price', 'hi-price'];
    return (
      <div className="price-range-btns flex">
        {[...Array(total)].map((el, idx) => (
          <button
            onClick={() => selectPrice(idx + 1)}
            className={`price-btn ${classNames[idx]}`}
            key={`b-${idx}`}
            style={{
              backgroundImage:
                selectColor === idx + 1
                  ? `url(${require(`../assets/imgs/icons/coins/coin${
                      idx + 1
                    }.svg`)})`
                  : `url(${require(`../assets/imgs/icons/coins/coinwhite${
                      idx + 1
                    }.svg`)})`,
              backgroundColor: selectColor === idx + 1 ? '#ba1628' : '',
            }}
          ></button>
        ))}
      </div>
    );
  };

  const onChangePage = (nextPage) => {
    setCurrentPage(nextPage);
  };
  if (!demoData) return <div></div>;
  console.log(widthScreen);
  return (
    <section className="primary-wines">
      <div className="primary-top-title">Top lists in your area</div>
      <div className="primary-sub-title">Updated every Thursday</div>
      {priceRangeBtns()}
      <div className="main-carousel">
        {currentPage * -1 + 1 < demoData.wines.length / 4 ? (
          <div
            className="carousel-control"
            style={{ right: '10px', transform: 'translate(50%, -50%)' }}
            onClick={() => onChangePage(currentPage - 1)}
          >
            <img
              className="right-control"
              src={require('../assets/imgs/icons/rightarrow.svg').default}
              alt="rightarrow"
            />
          </div>
        ) : null}
        {currentPage + 2 < demoData.wines.length / 4 ? (
          <div
            className="carousel-control"
            style={{ left: '10px', transform: 'translate(-50%, -50%)' }}
            onClick={() => onChangePage(currentPage + 1)}
          >
            <img
              className="right-control"
              src={require('../assets/imgs/icons/rightarrow.svg').default}
              alt="rightarrow"
              style={{ transform: 'rotate(180deg)' }}
            />
          </div>
        ) : null}
        <div className="wines-carousel-style">
          <div
            className="wines-carousel flex"
            style={{
              transform: `translateX(${currentPage * 100}%)`,
              width: 'calc(100% - 10px)',
            }}
          >
            {demoData.wines.map((wine, idx) => (
              <div className="wine-card" key={'WINE_' + idx}>
                <div className="upper-card flex ">
                  <div className="wine-img hover-wine">
                    <img
                      src={require('../assets/imgs/icons/1wine.png')}
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
                        wine.price ? { color: '#046057' } : { color: '#b03000' }
                      }
                    >
                      {wine.price ? wine.price + '$' : 'Sold Out'}
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
