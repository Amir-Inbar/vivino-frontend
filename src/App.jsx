import { HashRouter as Router, Switch } from 'react-router-dom';
// import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import './styles/styles.scss';

export function App() {
  return (
    <Router>
      <div className="App">
        <main className="container">
          <Switch></Switch>
        </main>
      </div>
    </Router>
  );
}
