import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { logoutAction, setSessionAction } from './actions/sessionAction';
import Header from './components/Header/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import NotImplemented from './pages/NotImplemented';
import Main from './pages/Main';
import Settings from './components/settings/Settings';
import RegisterMap from './pages/RegisterMap';

function App({ isAuthenticated }) {
  const dispatch = useDispatch();

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
          <Route path="/">
            <NotImplemented isLoggedIn={isAuthenticated} loggingOut={loggingOut} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ session }) => ({
  isAuthenticated: session.isAuthenticated,
  token: session.token,
});

export default connect(mapStateToProps)(App);
