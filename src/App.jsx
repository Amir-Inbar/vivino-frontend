import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { AppHeader } from "./components/AppHeader";
import { WinePage } from "./pages/WinePage";
import { WineryPage } from "./pages/WineryPage";
import { HomePage } from "./pages/HomePage";
import "./styles/global.scss";
import { LoginPage } from "./pages/LoginPage";
import { FilterPage } from "./pages/FilterPage";
import { useDispatch, useSelector } from "react-redux";
import { wineService } from "./services/wine.service";
import { setKeywords } from "./store/actions/wineAction";
import { useEffect } from "react";

export function App() {
  const { keywords } = useSelector((state) => state.wineModule);
  const dispatch = useDispatch();

  // useEffect(async () => {
  //   if (!keywords)
  //     try {
  //       const res = await wineService.query({ keywords: true });
  //       dispatch(setKeywords(res));
  //     } catch (err) {
  //       console.log(err);
  //     }
  // }, [keywords]);

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
