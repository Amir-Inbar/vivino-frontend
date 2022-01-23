import { Component } from "react";

export class AppHeader extends Component {
  render() {
    return (
      <header className="app-header">
        <div className="control-bar">
          <div className="logo">
            <img src={require("../assets/imgs/logo.svg").default} />
          </div>
          <div className="search">
            <input placeholder="Search any wine"></input>
          </div>
        </div>
        <nav>
          <ul>
            <li className="wines">Wines</li>
            <li className="pairings">Pairings</li>
            <li className="grapes">Grapes</li>
            <li className="regions">Regions</li>
            <li className="awards">Awards</li>
          </ul>
        </nav>
      </header>
    );
  }
}
