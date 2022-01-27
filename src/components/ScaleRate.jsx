import { camelCaseToSentence } from "../services/util.service";
import sections from "../assets/json/scale-sections.json";

export function ScaleRate(props) {
  const { wine } = props;

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
        <BasedOn wine={wine} />
      </div>
    </>
  ) : null;
}
