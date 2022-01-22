import { Component } from "react";

export class AppHeader extends Component {
  render() {
    return (
      <header className="app-header">
        <div className="control-bar">
          <div className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125 22">
              <path
                fill="#ba1628"
                fill-rule="evenodd"
                d="M1677.87,450.937h5.57V429.16h-5.57v21.777Zm36.84,0.006,5.56-.012V429.172h-5.56v21.771Zm-63.73-21.792,5.59,0,5.45,12.555h0.38l5.54-12.559,5.71-.008-9.52,21.8-3.54.012Zm36.77,0.018,5.57,0.007,5.43,12.534h0.41l5.49-12.541,5.71,0.007-9.47,21.761-3.56.011Zm39.72-.018h3.92c0.5,0.7.93,1.331,1.37,1.9h0.38c5.56-4.223,14.08-1.577,14.08,5.585l-0.01,14.305h-5.42l-0.05-13.423c-0.27-4.463-6.9-5.1-8.19-.561a14.126,14.126,0,0,0-.41,4.409l0.01,9.586-5.71-.011Zm37-.162c6.35,0,11.53,4.944,11.53,10.983a11.3,11.3,0,0,1-11.53,11.037v-4.57a6.321,6.321,0,0,0,0-12.641v-4.809Zm0,22.02a11.3,11.3,0,0,1-11.53-11.037c0-6.039,5.18-10.983,11.53-10.983V433.8a6.321,6.321,0,0,0,0,12.641v4.57Z"
                transform="translate(-1651 -429)"
              ></path>
            </svg>
          </div>
          <div className="search">
            <input placeholder="Search any wine"></input>
          </div>
        </div>
        <nav>
          <ul>
            <li>Wines</li>
            <li>Pairings</li>
            <li>Grapes</li>
            <li>Regions</li>
            <li>Awards</li>
          </ul>
        </nav>
      </header>
    );
  }
}
