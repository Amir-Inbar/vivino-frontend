import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { AppHeader } from "./components/AppHeader";
// import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { VivinoApp } from "./pages/VivinoApp";
import { WinePage } from "./pages/WinePage";

import "./styles/global.scss";

export function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <main className="container">
          <Switch>
            {/* <Route component={VivinoApp} path="/" /> */}
            <Route component={WinePage} path="/" />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
