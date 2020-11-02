import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import NotImplemented from './pages/NotImplemented';
import Main from './pages/Main';
import Settings from './components/settings/Settings';
import RegisterMap from './pages/RegisterMap';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));

  function loggingOut() {
    setIsLoggedIn(null);
    localStorage.removeItem('token');
  }
  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} loggingOut={loggingOut} />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/register/map" component={RegisterMap} />
          <Route path="/kingdom/" component={Main} />
          <Route path="/">
            <NotImplemented isLoggedIn={isLoggedIn} loggingOut={loggingOut} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
