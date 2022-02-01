import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { AppHeader } from "./components/AppHeader";
// import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { WinePage } from "./pages/WinePage";
import { WineryPage } from "./pages/WineryPage";
import { HomePage } from "./pages/HomePage";
import "./styles/global.scss";
import { LoginPage } from "./pages/LoginPage";
import { FilterPage } from "./pages/FilterPage";

export function App() {
  return (
    <Router>
      <div className="App">
        <main className="container">
          <AppHeader />
          <Switch>
            <Route component={WinePage} path="/wine/:id" />
            <Route component={FilterPage} path="/wine" />
            <Route component={WineryPage} path="/winery/:id" />
            <Route component={LoginPage} path="/login" />
            <Route component={HomePage} path="/" />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
