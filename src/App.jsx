import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { AppHeader } from "./components/AppHeader";
// import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { VivinoApp } from "./pages/VivinoApp";
import { WinePage } from "./pages/WinePage";
import { WineryPage } from "./pages/WineryPage";

import "./styles/global.scss";

export function App() {
  return (
    <Router>
      <div className="App">
        <main className="container">
          <AppHeader />
          <Switch>
            {/* <Route component={VivinoApp} path="/" /> */}
            {/* <Route component={WinePage} path="/" /> */}
            <Route component={WineryPage} path="/" />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
