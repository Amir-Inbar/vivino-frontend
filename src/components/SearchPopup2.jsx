import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import useChangeEffect from '../hooks/useChangeEffect';
import { debounce } from '../services/util.service';
import { wineService } from '../services/wine.service';
import { setFilterBy } from '../store/actions/wineAction';
import { mediaQuery } from './AppHeader';

export function SearchPopup({ section, setProp }) {
  const rtl = document.dir === 'rtl';
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [filter, setFilter] = useState(null);

  const elSearch = useRef(null);

  useEffect(async () => {
    const data = await wineService.query({ keywords: true, section });
    console.log(data);
    setData(data);
  }, []);

  const SearchResult = ({ result, search, close }) => {
    if (!result?.length || !search) return null;
    const el = elSearch.current;
    const top = el.offsetTop + el.clientHeight + 16;
    const left = el.offsetLeft;
    const right = window.innerWidth - (el.offsetLeft + el.clientWidth);
    const style = { top: `${top}px` };
    if (window.innerWidth > mediaQuery.mobile)
      if (rtl) style.right = `${right}px`;
      else style.left = `${left}px`;
    return (
      <div className="quick-search-result" style={style}>
        <ul>
          {result.map((res, idx) => {
            const re = new RegExp(`(${search})`, 'gi');
            const title = {
              __html: `${res.name.replace(re, `<span class="bold">$1</span>`)}`,
            };
            return (
              <li
                key={'SEARCH_RESULT_' + res.name}
                // onClick={() => selectProp()}
              >
                {res.image ? <img src={res.image} /> : null}
                <p
                  data-trans={`${res.seo || res.name} `}
                  dangerouslySetInnerHTML={title}
                ></p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const cleanUp = () => {
    setResult(null);
    setFilter(null);
  };

  const searchInput = ({ target }) => {
    if (!target.value) {
      cleanUp();
    } else {
      setProp({ [section]: target.value });
      setFilter(target.value);

      const result = data
        .filter((item) => item.name.includes(target.value))
        .slice(0, 8);
      setResult(result);
    }
  };

  return (
    <>
      <div className="search" ref={elSearch}>
        <input
          placeholder="Search any wine"
          onInput={searchInput}
          onFocus={searchInput}
          spellCheck="false"
        ></input>
      </div>
      <SearchResult result={result} search={filter} close={cleanUp} />
    </>
  );
}
