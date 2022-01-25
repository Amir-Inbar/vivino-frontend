import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { AppHeader } from './components/AppHeader';
// import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { HomePage } from './pages/HomePage';
import { WineryPage } from './pages/WineryPage';

import './styles/global.scss';

export function App() {
  return (
    <Router>
      <div className="App">
        <main className="container">
          <AppHeader />
          <Switch>
            {/* <Route component={HomePage} path="/" /> */}
            {/* <Route component={WinePage} path="/" /> */}
            <Route component={WineryPage} path="/" />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
