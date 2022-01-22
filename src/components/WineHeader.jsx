import { Component } from "react";
import emptyStar from "../assets/imgs/icons/empty-star.svg";
import fullStar from "../assets/imgs/icons/full-star.svg";

export class WineHeader extends Component {
  tags = ["Israel", "Judean Hills", "Red wine", "Cabernet Sauvignon"];

  renderTags() {
    return this.tags.map((tag, i) => (
      <a className="tag" key={i}>
        {tag}
      </a>
    ));
  }

  renderStars(symbol, stars) {
    const n = 5;
    const width = (82.5 * (stars || n)) / n + "px";
    const template = [...Array(n)].map((el, i) => <img src={symbol} key={i} />);
    return (
      <div className="stars" style={{ width }}>
        {template}
      </div>
    );
  }

  render() {
    return (
      <div className="top-section full">
        <div className="picture">
          <img src="//images.vivino.com/thumbs/B8ukZ0TdRb2r9pLFD9cSNg_pb_x600.png" />
        </div>
        <div className="content">
          <h2>Shiloh</h2>
          <h1>Shor Cabernet Sauvignon 2018</h1>
          <div className="tags">{this.renderTags()}</div>
          <div className="rate">
            <div className="avg">4.2</div>
            <div className="more-info">
              <div className="stars-container">
                {this.renderStars(emptyStar)}
                {this.renderStars(fullStar, 4.2)}
              </div>
              <div className="num-ratings">94 ratings</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
