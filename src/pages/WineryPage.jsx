import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WineryHeader } from "../components/WineryHeader";
import { WineryWines } from "../components/WineryWines";
import { wineService } from "../services/wine.service";
import { loadWinery } from "../store/actions/wineryAction";

export const WineryPage = (props) => {
  const dispatch = useDispatch();
  const { winery } = useSelector((state) => state.wineryModule);
  const [wines, setWines] = useState(null);

  useEffect(() => {
    const { id } = props.match.params;
    dispatch(loadWinery(id));
  }, [props.match.params.id]);

  useEffect(() => loadMoreWines(), [winery]);

  const loadMoreWines = async () => {
    const top = await wineService.query({
      filter: { eqCountry: winery.country, eqWinery: winery.name },
      sort: { rate: 0 },
      rule: "AND",
    });
    const popular = await wineService.query({
      filter: { eqCountry: winery.country, eqWinery: winery.name },
      sort: { ratings: 0 },
      rule: "AND",
    });
    setWines({ top: top.data, popular: popular.data });
  };

  return winery ? (
    <>
      <WineryHeader winery={winery} />
      <WineryWines
        winery={winery}
        top={wines?.top}
        popular={wines?.popular}
        max={8}
      />
    </>
  ) : null;
};
