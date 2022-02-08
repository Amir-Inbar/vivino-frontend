import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mediaQuery } from '../components/AppHeader';
import { setFilterBy } from '../store/actions/wineAction';
import { debounce } from '../services/util.service';
import useChangeEffect from '../hooks/useChangeEffect';
import { wineService } from '../services/wine.service';
import { SearchPopup } from '../components/SearchPopup2';
export const WineEditPage = () => {
  const [wine, setWine] = useState({
    name: null,
    winery: null,
    country: null,
    region: null,
    type: null,
    grapes: null, //multi
    pairings: null, //multi
    image: null,
    bold: null,
    tannic: null,
    sweet: null,
    acidic: null,
    alcohol: null,
    seo: null,
  });
  // const
  const setProp = (prop) => {
    setWine({ ...wine, prop });
  };
  const prop = ['winery', 'country', 'region', 'grapes', 'pairings', 'seo'];
  return (
    <>
      <SearchPopup section={'region'} setProp={setProp} />
    </>
  );
};
