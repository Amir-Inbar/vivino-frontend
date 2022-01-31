import { camelCaseToSentence, debounce } from "../services/util.service";
import sections from "../assets/json/scale-sections.json";
import { useRef, useState } from "react";
import { reviewService } from "../services/review.service";
import { useLayoutEffect } from "react";

export function ScaleRate(props) {
  const { wine } = props;
  const isFirstRun = useRef(true);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [wineScale, setScale] = useState({
    bold: wine.bold,
    tannic: wine.tannic,
    sweet: wine.sweet,
    acidic: wine.acidic,
  });

  useLayoutEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    debounce(
      async () => {
        const recent = await reviewService.set(wine._id, wineScale, {
          type: "structure",
        });
        console.log(recent);
      },
      "wineScale",
      2000
    );
  }, [wineScale]);

  const BasedOn = ({ wine }) => {
    const content = `The taste profile of ${wine.winery} ${wine.name} is based on ${wine.ratings} user reviews`;
    return wine.ratings ? (
      <div className="more">
        <h4>Members taste summary</h4>
        <p>{content}</p>
      </div>
    ) : null;
  };

  const scales = () => {
    const barWidth = 15;
    const slideRange = 100 - barWidth;
    return sections.map((scale, idx) => {
      return (
        <tr key={"SCALE_RATE_" + idx}>
          <td>{camelCaseToSentence(scale.min)}</td>
          <td className="scale-container">
            <div className="scale">
              <div
                style={{
                  marginInlineStart:
                    (wineScale[scale.max] / 100) * slideRange + "%",
                  width: barWidth + "%",
                }}
                onMouseDown={() => setIsMouseDown(true)}
                onMouseUp={() => setIsMouseDown(false)}
                onMouseMoveCapture={(ev) => setMouse(ev, scale.max)}
              ></div>
            </div>
          </td>
          <td>{camelCaseToSentence(scale.max)}</td>
        </tr>
      );
    });
  };

  const setMouse = (ev, scale) => {
    if (!isMouseDown) return;
    const bondClient = ev.target.parentElement.getBoundingClientRect();
    const thumbClient = ev.target.getBoundingClientRect();
    const scaleMin = bondClient.left;
    const scaleWidth = ev.target.parentElement.offsetWidth;
    const thumbLeft = (ev.pageX - thumbClient.left) / 2;
    const currPos = Math.min(ev.pageX + thumbLeft - scaleMin, scaleWidth);
    setScale({
      ...wineScale,
      [scale]: (currPos / scaleWidth) * 100,
    });
  };

  const data = scales();

  return data.filter((scale) => scale).length ? (
    <>
      <h2>What does this wine taste like?</h2>
      <div
        className="details"
        onMouseLeave={() => setIsMouseDown(false)}
        onMouseUp={() => setIsMouseDown(false)}
      >
        <table>
          <tbody>{data}</tbody>
        </table>
        <BasedOn wine={wine} />
      </div>
    </>
  ) : null;
}
