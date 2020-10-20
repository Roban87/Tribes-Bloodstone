import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register.js';
import ResourcesContainer from './components/ResourcesContainer/ResourcesContainer'

function App() {
  return (
    <Router>
      <div className="App">
        <ResourcesContainer />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/main">
            <h1>HomePage</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
