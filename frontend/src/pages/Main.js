import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setRulesAsync } from '../actions/rulesAction';
import { setUserAsyncAction } from '../actions/userActions';
import { setKingdomsAsync } from '../actions/kingdomsActions';
import { setTroopsAsync } from '../actions/troopsActions';
import { getBuildingsLeaderboardFetch } from '../actions/leaderboardActions';
import '../styles/Main.css';
import ResourcesContainer from '../components/ResourcesContainer/ResourcesContainer';
import KingdomBuildings from '../components/kingdomBuildings/KingdomBuildings';
import BuildingDetails from '../components/BuildingDetails/BuildingDetails';
import Menu from '../components/Menu/Menu';
import TroopsContainer from '../components/TroopsContainer/TroopsContainer';
import Battle from '../components/Battle/Battle';
import LeaderboardBuildings from '../components/LeaderboardBuildings/LeaderboardBuildings';
import ConstructionLog from '../components/Construction/ConstructionLog';

function Main(props) {
  const {
    location,
    leaderboardBuildings,
    leaderboardError,
  } = props;

  const { pathname } = location;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setRulesAsync());
    dispatch(getBuildingsLeaderboardFetch());
    dispatch(setUserAsyncAction());
    dispatch(setKingdomsAsync());
    dispatch(setTroopsAsync());
  }, [dispatch]);

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
          <Route path="/kingdom/leaderboard" component={() => <LeaderboardBuildings buildings={leaderboardBuildings} error={leaderboardError} />} />

        </Switch>
      </div>

      <div className="construction-log-container">
        <ConstructionLog />
      </div>
    </div>
  );
}

Main.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  leaderboardBuildings: PropTypes.arrayOf(PropTypes.object).isRequired,
  leaderboardError: PropTypes.string.isRequired,
};

const mapStateToProps = ({ rules, leaderboard, error }) => ({
  rules: rules.rules,
  leaderboardBuildings: leaderboard.leaderboardBuildings,
  leaderboardError: error.leaderboardError,
});

export default connect(mapStateToProps)(Main);
