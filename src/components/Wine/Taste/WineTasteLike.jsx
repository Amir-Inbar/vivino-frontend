import { reviewService } from "../../../services/review.service";
import { debounce } from "../../../services/util.service";
import { ScaleRate } from "./WineScaleRate";
import { TasteFill } from "./WineTasteFills";

export function TasteLike(props) {
  const { wine } = props;

  const structureUpdate = (scales) => {
    debounce(
      async () => {
        const recent = await reviewService.set(wine._id, scales, {
          type: "structure",
        });
        console.log(recent);
      },
      "WINE_SCALES",
      2000
    );
  };

  return (
    <section className="taste-like">
      <ScaleRate wine={wine} set={structureUpdate} />
      <TasteFill tastes={wine.tastes} />
    </section>
  );
}
