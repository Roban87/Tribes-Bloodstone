import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import selectBuildingReducer from './selectBuildingReducer';
import buildingsReducer from './buildingsReducer';
import resourcesReducer from './resourcesReducer';
import setRulesReducer from './rulesReducer';
import troopsReducer from './troopsReducer';
import sessionReducer from './sessionReducer';

const rootReducer = combineReducers({
  error: errorReducer,
  currentBuilding: selectBuildingReducer,
  buildings: buildingsReducer,
  resources: resourcesReducer,
  rules: setRulesReducer,
  troops: troopsReducer,
  session: sessionReducer,
});

export default rootReducer;
