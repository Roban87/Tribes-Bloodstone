import React from 'react';
import { Switch, Route } from 'react-router-dom';
import KingdomBuildings from '../components/kingdomBuildings/KingdomBuildings';
import BuildingDetails from '../components/BuildingDetails/BuildingDetails';

export default function Main() {
  return (
    <div>
      <div className="menu-container">PLACEHOLDER</div>
      <div className="construction-log-container">PLACEHOLDER</div>
      <div className="resource-generation">PLACEHOLDER</div>
      <div className="kingdom-details-container">
        <Switch>
          <Route exact path="/kingdom/buildings" component={KingdomBuildings} />
          <Route exact path="/kingdom/buildings/:id" component={BuildingDetails} />
        </Switch>
      </div>
    </div>
  );
}
