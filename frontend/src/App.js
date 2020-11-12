import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { logoutAction, setSessionAction } from './actions/sessionAction';
import NotImplemented from './pages/NotImplemented';
import Header from './components/Header/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import Settings from './components/settings/Settings';
import RegisterMap from './pages/RegisterMap';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.session.isAuthenticated);
  const tokenExists = () => {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    dispatch(setSessionAction());
  }, [dispatch]);

  function loggingOut() {
    dispatch(logoutAction());
    localStorage.removeItem('token');
  }
  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isAuthenticated} loggingOut={loggingOut} />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/register/map" component={RegisterMap} />
          <Route path="/kingdom/" component={Main} />
          <Route exact path="/">
            {tokenExists() ? <Redirect to="/kingdom" /> : <Redirect to="/login" />}
          </Route>
          <Route path="/">
            <NotImplemented isLoggedIn={isAuthenticated} loggingOut={loggingOut} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
