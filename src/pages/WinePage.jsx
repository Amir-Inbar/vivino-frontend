import { WineHeader } from "../components/WineHeader";
import { TasteLike } from "../components/WineTasteLike";
import demo from "../temp/wines.json";

export const WinePage = () => {
  return (
    <>
      <WineHeader wine={demo.wine} />
      <TasteLike wine={demo.wine} />
    </>
  );
};
