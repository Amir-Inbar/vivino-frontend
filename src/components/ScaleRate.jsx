import { camelCaseToSentence } from "../services/util.service";
import sections from "../assets/json/scale-sections.json";

export function ScaleRate(props) {
  const { wine } = props;

  const scaleReducer = sections.map((scale) => {
    const count = wine.reviews.reduce(
      (sum, review) => {
        const desc = review.description;
        const decrease = new RegExp(`(${scale.decrease.join("|")})`, "gi");
        const increase = new RegExp(`(${scale.increase.join("|")})`, "gi");
        sum[scale.min] += (desc.match(decrease) || []).length;
        sum[scale.max] += (desc.match(increase) || []).length;
        return sum;
      },
      { [scale.min]: 0, [scale.max]: 0 }
    );
    // console.log(count);
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
        : scale.avg * slideRange;
      return (
        <tr key={"SCALE_RATE_" + idx}>
          <td>{camelCaseToSentence(scale.min)}</td>
          <td className="scale-container">
            <div className="scale">
              <div
                style={{
                  left: (wine[scale.max] / 100) * slideRange + "%",
                  width: barWidth + "%",
                }}
              ></div>
            </div>
          </td>
          <td>{camelCaseToSentence(scale.max)}</td>
        </tr>
      );
    });
  };

  return (
    <table>
      <tbody>{scales()}</tbody>
    </table>
  );
}
