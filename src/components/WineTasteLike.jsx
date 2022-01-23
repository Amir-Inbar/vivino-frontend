import { Component } from "react";
import { ScaleRate } from "./ScaleRate";
import TasteFill from "./TasteFills";
import tastes from "../assets/json/fill-taste.json";

export class TasteLike extends Component {
  render() {
    return (
      <div className="taste-like">
        <h2>What does this wine taste like?</h2>
        <div className="details">
          <table>
            <tr>
              <td>Light</td>
              <ScaleRate percentage={80} />
              <td>Bold</td>
            </tr>
            <tr>
              <td>Smooth</td>
              <ScaleRate percentage={60} />
              <td>Tannic</td>
            </tr>
            <tr>
              <td>Dry</td>
              <ScaleRate percentage={20} />
              <td>Sweet</td>
            </tr>
            <tr>
              <td>Soft</td>
              <ScaleRate percentage={40} />
              <td>Acidic</td>
            </tr>
          </table>
          <div className="more">
            <h4>Wine lovers taste summary</h4>
            <p>
              The taste profile of Shiloh Shor Cabernet Sauvignon is based on
              121 user reviews
            </p>
          </div>
        </div>
        <TasteFill tastes={tastes} />
      </div>
    );
  }
}
