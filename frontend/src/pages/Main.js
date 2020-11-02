import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setRulesAsync } from '../actions/rulesAction';
import '../styles/Main.css';
import ResourcesContainer from '../components/ResourcesContainer/ResourcesContainer';
import KingdomBuildings from '../components/kingdomBuildings/KingdomBuildings';
import BuildingDetails from '../components/BuildingDetails/BuildingDetails';

function Main(props) {
  const {
    getRules,
  } = props;

  useEffect(() => {
    getRules();
  }, [getRules]);

  return (
    <div className="main-container">
      <div className="menu-container" />
      <ResourcesContainer className="resources-container" />

      <div className="content-container">
        <Switch>
          <Route exact path="/kingdom/buildings" component={KingdomBuildings} />

          <Route exact path="/kingdom/buildings/:id" component={BuildingDetails} />

          <Route exact path="/kingdom/troops">
            <h1>
              Troops
            </h1>
          </Route>

        </Switch>
      </div>

      <div className="construction-log-container" />

    </div>
  );
}

Main.propTypes = {
  getRules: PropTypes.func.isRequired,
};

const mapStateToProps = ({ rules }) => ({
  rules: rules.rules,
});

const mapDispatchToProps = (dispatch) => ({
  getRules: () => dispatch(setRulesAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
