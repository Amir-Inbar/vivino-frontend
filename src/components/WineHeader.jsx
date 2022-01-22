import { Component } from "react";
import emptyStar from "../assets/imgs/icons/empty-star.svg";
import fullStar from "../assets/imgs/icons/full-star.svg";

export class WineHeader extends Component {
  tags = ["Israel", "Judean Hills", "Red wine", "Cabernet Sauvignon"];

  previewTags() {
    return this.tags.map((tag) => <span className="tag">{tag}</span>);
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
          <div className="tags">{this.previewTags()}</div>
          <div className="rate">
            <div className="avg">4.2</div>
            <div className="more-info">
              <div className="stars">
                <div className="empty">
                  <img src={emptyStar} />
                  <img src={emptyStar} />
                  <img src={emptyStar} />
                  <img src={emptyStar} />
                  <img src={emptyStar} />
                </div>
                <div className="full" style={{ width: "75px" }}>
                  <img src={fullStar} />
                  <img src={fullStar} />
                  <img src={fullStar} />
                  <img src={fullStar} />
                  <img src={fullStar} />
                </div>
              </div>
              <div className="num-ratings">94 ratings</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
