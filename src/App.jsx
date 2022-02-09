import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { AppHeader } from "./components/AppHeader";
import { WinePage } from "./pages/WinePage";
import { WineryPage } from "./pages/WineryPage";
import { HomePage } from "./pages/HomePage";
import { WineEditPage } from "./pages/WineEditPage";
import { LoginPage } from "./pages/LoginPage";
import { FilterPage } from "./pages/WineFilterPage";
import { useDispatch, useSelector } from "react-redux";
import { wineService } from "./services/wine.service";
import { setKeywords } from "./store/actions/wineAction";
import { useEffect } from "react";
import "./styles/global.scss";

export function App() {
  const keywords = useSelector((state) => state.wineModule.keywords);
  const dispatch = useDispatch();
  // document.dir = "rtl";

  useEffect(async () => {
    if (!keywords)
      try {
        const res = await wineService.query({ keywords: true });
        dispatch(setKeywords(res));
      } catch (err) {
        console.log(err);
      }
  }, [keywords]);

  return (
    <Router>
      <div className="App">
        <main className="container">
          <AppHeader />
          <Switch>
            <Route component={WinePage} path="/wine/:id" />
            <Route component={FilterPage} path="/wine" />
            <Route component={WineEditPage} path="/addwine" />
            <Route component={WineryPage} path="/winery/:id" />
            <Route component={LoginPage} path="/login" />
            <Route component={HomePage} path="/" />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
