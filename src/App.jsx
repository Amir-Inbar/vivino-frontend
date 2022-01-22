import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { VivinoApp } from './pages/VivinoApp';

import './styles/global.scss';

export function App() {
  return (
    <Router>
      <div className="App">
        <main className="container">
          <Switch>
            <Route component={VivinoApp} path="/" />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
