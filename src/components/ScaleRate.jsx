import { camelCaseToSentence } from "../services/util.service";
import sections from "../assets/json/scale-sections.json";

export function ScaleRate(props) {
  const { wine } = props;

  const basedOn = () =>
    `The taste profile of ${wine.winery.name || wine.winery} ${
      wine.name
    } is based on ${wine.reviews.length} user reviews`;

  const scaleReducer = sections.map((scale) => {
    const count = wine.reviews.reduce(
      (sum, review) => {
        const desc = review.description;
        const decrease = new RegExp(`(${scale.decrease.join("|")})`, "gi");
        const increase = new RegExp(`(${scale.increase.join("|")})`, "gi");
        sum[scale.min] += desc.match(decrease)?.length || 0;
        sum[scale.max] += desc.match(increase)?.length || 0;
        return sum;
      },
      { [scale.min]: 0, [scale.max]: 0 }
    );
    const avg = count[scale.max] / (count[scale.min] + count[scale.max]);
    return { min: scale.min, max: scale.max, avg: avg || 0.5 };
  });

  const scales = () => {
    const barWidth = 15;
    const slideRange = 100 - barWidth;
    return scaleReducer.map((scale, idx) => {
      const avg = wine[scale.max]
        ? scale.avg * slideRange * 0.3 +
          (wine[scale.max] / 100) * slideRange * 0.7
        : scale.avg * slideRange || 0.5 * slideRange;
      return wine[scale.max] ? (
        <tr key={"SCALE_RATE_" + idx}>
          <td>{camelCaseToSentence(scale.min)}</td>
          <td className="scale-container">
            <div className="scale">
              <div
                style={{
                  marginInlineStart: (wine[scale.max] / 100) * slideRange + "%",
                  width: barWidth + "%",
                }}
              ></div>
            </div>
          </td>
          <td>{camelCaseToSentence(scale.max)}</td>
        </tr>
      ) : (
        ""
      );
    });
  };

  const data = scales();

  return data.filter((scale) => scale).length ? (
    <>
      <h2>What does this wine taste like?</h2>
      <div className="details">
        <table>
          <tbody>{data}</tbody>
        </table>
        <div className="more">
          <h4>Wine lovers taste summary</h4>
          <p>{basedOn()}</p>
        </div>
      </div>
    </>
  ) : null;
}
