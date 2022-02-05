import { camelCaseToSentence, debounce } from "../services/util.service";
import sections from "../assets/json/scale-sections.json";
import { useEffect, useRef, useState } from "react";
import { reviewService } from "../services/review.service";
import { useLayoutEffect } from "react";
import { authService } from "../services/auth.service";

export function ScaleRate(props) {
  const { wine } = props;
  const isFirstRun = useRef(true);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [targetElement, setTargetElement] = useState(null);
  const [wineScale, setScale] = useState();
  const [isSelfRate, setIsSelfRate] = useState({});
  const rtl = document.dir === "rtl";

  useEffect(async () => {
    isFirstRun.current = true;
    setScale(null);
    if (!wine) return;
    if (authService.getLoggedinUser())
      try {
        const res = await reviewService.query({
          structure: true,
          wineId: wine._id,
        });
        if (res) setScale(res);
        setIsSelfRate(!!res);
      } catch (err) {}
    if (!wineScale)
      setScale({
        bold: wine.bold,
        tannic: wine.tannic,
        sweet: wine.sweet,
        acidic: wine.acidic,
      });
  }, [wine]);

  useLayoutEffect(() => {
    if (!wineScale) return;
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

  if (!wine || !wineScale) return null;
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
      return wineScale[scale.max] || authService.getLoggedinUser() ? (
        <tr
          key={"SCALE_RATE_" + idx}
          onMouseMove={(ev) => setMouse(ev, scale.max)}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          <td>{camelCaseToSentence(scale.min)}</td>
          <td className="scale-container">
            <div className="scale">
              <div
                className={`thumb ${isSelfRate ? "self" : ""} ${
                  typeof wineScale[scale.max] !== "number" ? "unrated" : ""
                }`}
                style={{
                  marginInlineStart:
                    Math.max((wineScale[scale.max] / 100) * slideRange, 0) +
                    "%",
                  width: barWidth + "%",
                }}
                onMouseDown={startDrag}
              ></div>
            </div>
          </td>
          <td>{camelCaseToSentence(scale.max)}</td>
        </tr>
      ) : null;
    });
  };

  const startDrag = ({ target }) => {
    if (isMouseDown || !authService.getLoggedinUser()) return;
    setIsMouseDown(true);
    setTargetElement(target);
  };

  const stopDrag = () => {
    setIsMouseDown(false);
    setTargetElement(null);
  };

  const setMouse = (ev, scale) => {
    if (!isMouseDown) return;
    const bondClient = targetElement.parentElement.getBoundingClientRect();
    const thumbClient = targetElement.getBoundingClientRect();
    if (rtl) {
    } else {
      const scaleMin = bondClient.left;
      const scaleWidth = targetElement.parentElement.offsetWidth;
      const thumbLeft = (ev.pageX - thumbClient.left) / 2;
      const currPos = Math.min(ev.pageX + thumbLeft - scaleMin, scaleWidth);
      setScale({
        ...wineScale,
        [scale]: Math.max((currPos / scaleWidth) * 100, 0),
      });
    }
  };

  const data = scales();
  return (
    <>
      <h2>What does this wine taste like?</h2>
      <div className="details">
        <table onMouseLeave={stopDrag}>
          <tbody>{data}</tbody>
        </table>
        <BasedOn wine={wine} />
      </div>
    </>
  );
}
