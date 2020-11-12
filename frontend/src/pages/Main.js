import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setRulesAsync } from '../actions/rulesAction';
import { setUserAsyncAction } from '../actions/userActions';
import { setKingdomsAsync } from '../actions/kingdomsActions';
import { setTroopsAsync } from '../actions/troopsActions';
import '../styles/Main.css';
import ResourcesContainer from '../components/ResourcesContainer/ResourcesContainer';
import KingdomBuildings from '../components/kingdomBuildings/KingdomBuildings';
import BuildingDetails from '../components/BuildingDetails/BuildingDetails';
import Menu from '../components/Menu/Menu';
import TroopsContainer from '../components/TroopsContainer/TroopsContainer';
import Battle from '../components/Battle/Battle';

function Main(props) {
  const {
    getRules,
    location,
  } = props;

  const { pathname } = location;

  const dispatch = useDispatch();
  useEffect(() => {
    getRules();
    dispatch(setUserAsyncAction());
    dispatch(setKingdomsAsync());
    dispatch(setTroopsAsync());
  }, [getRules, dispatch]);

  const menuPlace = (path) => {
    if (path === '/kingdom' || path === '/kingdom/buildings') {
      return 'Buildings';
    }
    if (path === '/kingdom/troops') {
      return 'Troops';
    }
    if (path === '/kingdom/battle') {
      return 'Battle';
    }
    if (path === '/kingdom/leaderboard') {
      return 'Leaderboard';
    }
    return null;
  };

  return (
    <div className="main-container">
      <Menu className="menu-container" />
      <ResourcesContainer className="resources-container" />

      <div className="content-container">
        <span className="this-path">{menuPlace(pathname)}</span>
        <Switch>
          <Route exact path={['/kingdom', '/kingdom/buildings']} component={KingdomBuildings} />

          <Route exact path="/kingdom/buildings/:id" component={BuildingDetails} />

          <Route exact path="/kingdom/troops" component={TroopsContainer} />

          <Route exact path="/kingdom/battle" component={Battle} />

        </Switch>
      </div>

      <div className="construction-log-container">
        <p>Construction Log</p>
      </div>

    </div>
  );
}

Main.propTypes = {
  getRules: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ rules }) => ({
  rules: rules.rules,
});

const mapDispatchToProps = (dispatch) => ({
  getRules: () => dispatch(setRulesAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
