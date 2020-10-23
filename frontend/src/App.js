import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register.js';
import NotImplemented from './pages/NotImplemented';
import Settings from './components/settings/Settings.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/">
            <h1>HomePage</h1>
          </Route>
          <Route path="/" component={NotImplemented} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
