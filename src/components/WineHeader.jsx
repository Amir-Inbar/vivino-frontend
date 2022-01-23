import { Component } from "react";
import { StarRate } from "./StarRate";

export class WineHeader extends Component {
  tags = ["Israel", "Judean Hills", "Red wine", "Cabernet Sauvignon"];

  renderTags() {
    return this.tags.map((tag, i) => (
      <a className="tag" key={"WINE_TAG_" + i}>
        {tag}
      </a>
    ));
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
              <StarRate rate={4.2} />
              <div className="num-ratings">94 ratings</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
