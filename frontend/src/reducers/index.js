import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import kingdomsReducer from './kingdomsReducer';
import selectBuildingReducer from './selectBuildingReducer';
import buildingsReducer from './buildingsReducer';
import resourcesReducer from './resourcesReducer';
import setRulesReducer from './rulesReducer';
import troopsReducer from './troopsReducer';
import sessionReducer from './sessionReducer';
import battleReducer from './battleReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  error: errorReducer,
  currentBuilding: selectBuildingReducer,
  buildings: buildingsReducer,
  resources: resourcesReducer,
  rules: setRulesReducer,
  troops: troopsReducer,
  session: sessionReducer,
  kingdoms: kingdomsReducer,
  battle: battleReducer,
  user: userReducer,
});

export default rootReducer;
