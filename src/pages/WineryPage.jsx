import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WineryHeader } from "../components/WineryHeader";
import { WineryWines } from "../components/WineryWines";
import { loadWinery } from "../store/actions/wineryAction";

export function WineryPage() {
  const dispatch = useDispatch();
  const { winery } = useSelector((state) => state.wineryModule);

  useEffect(() => {
    dispatch(loadWinery(4));
  }, [dispatch]);

  return winery ? (
    <>
      <WineryHeader winery={winery} />
      <WineryWines winery={winery} max={8} />
    </>
  ) : null;
}
