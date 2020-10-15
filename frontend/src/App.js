import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/main">
            <h1>Main Page</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
