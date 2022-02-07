import { camelCaseToSentence } from "../../../services/util.service";
import sections from "../../../assets/json/scale-sections.json";
import { useEffect, useRef, useState } from "react";
import { reviewService } from "../../../services/review.service";
import { useSelector } from "react-redux";

export function ScaleRate({ wine, set }) {
  const rtl = document.dir === "rtl";
  const isManualChange = useRef(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [targetElement, setTargetElement] = useState(null);
  const [wineScale, setScale] = useState();
  const [loadScale, setLoadedScale] = useState({});
  const [isSelfRate, setIsSelfRate] = useState({});
  const user = useSelector((state) => state.userModule.user);

  const barWidth = 15;
  const slideRange = 100 - barWidth;

  useEffect(() => {
    wineChanged();
    userChanged();
  }, [wine, user]);

  useEffect(() => {
    isManualChange.current = false;
    setScale(loadScale ? { ...loadScale } : null);
  }, [loadScale]);

  useEffect(() => {
    if (!wineScale) return;
    if (!isManualChange.current) {
      isManualChange.current = true;
      return;
    }
    set(wineScale);
  }, [wineScale]);

  const wineChanged = () => {
    const data = {
      bold: wine.bold,
      tannic: wine.tannic,
      sweet: wine.sweet,
      acidic: wine.acidic,
    };
    setLoadedScale(data);
    setIsSelfRate(false);
  };

  const userChanged = async () => {
    if (user) {
      try {
        const data = await reviewService.query({
          structure: true,
          wineId: wine._id,
        });
        if (data) setLoadedScale(data);
        setIsSelfRate(!!data);
      } catch (err) {}
    } else {
      wineChanged();
    }
  };

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

  const startDrag = ({ target }) => {
    if (isMouseDown || !user) return;
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
    const scaleWidth = targetElement.parentElement.offsetWidth;
    if (rtl) {
      const currPos = Math.min(ev.pageX - bondClient.left, scaleWidth);
      setScale({
        ...wineScale,
        [scale]: Math.min((1 - currPos / scaleWidth) * 100, 100),
      });
    } else {
      const scaleMin = bondClient.left;
      const thumbLeft = (ev.pageX - thumbClient.left) / 2;
      const currPos = Math.min(ev.pageX + thumbLeft - scaleMin, scaleWidth);
      setScale({
        ...wineScale,
        [scale]: Math.max((currPos / scaleWidth) * 100, 0),
      });
    }
  };

  return sections.filter((scale) => wineScale[scale.max]).length || user ? (
    <>
      <h2>What does this wine taste like?</h2>
      <div className="details">
        <table onMouseLeave={stopDrag}>
          <tbody>
            {sections.map((scale, idx) => {
              const position = rtl
                ? Math.max((wineScale[scale.max] / 100) * slideRange, 0)
                : Math.max((wineScale[scale.max] / 100) * slideRange, 0);
              return typeof wineScale[scale.max] === "number" || user ? (
                <tr
                  key={"SCALE_RATE_" + idx}
                  onMouseMove={(ev) => setMouse(ev, scale.max)}
                  onMouseUp={stopDrag}
                  onMouseLeave={stopDrag}
                  onTouchMove={(ev) => setMouse(ev, scale.max)}
                  onTouchEnd={stopDrag}
                >
                  <td data-trans={scale.min}>
                    {camelCaseToSentence(scale.min)}
                  </td>
                  <td className="scale-container">
                    <div className="scale">
                      <div
                        className={`thumb ${isSelfRate ? "self" : ""} ${
                          typeof wineScale[scale.max] !== "number"
                            ? "unrated"
                            : ""
                        }`}
                        style={{
                          [rtl ? "right" : "left"]: position + "%",
                          width: barWidth + "%",
                        }}
                        onMouseDown={startDrag}
                      ></div>
                    </div>
                  </td>
                  <td data-trans={scale.max}>
                    {camelCaseToSentence(scale.max)}
                  </td>
                </tr>
              ) : null;
            })}
          </tbody>
        </table>
        <BasedOn wine={wine} />
      </div>
    </>
  ) : null;
}
