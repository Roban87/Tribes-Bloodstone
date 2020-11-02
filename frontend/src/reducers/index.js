import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import selectBuildingReducer from './selectBuildingReducer';
import buildingsReducer from './buildingsReducer';
import resourcesReducer from './resourcesReducer';
import setRulesReducer from './rulesReducer';
import troopsReducer from './troopsReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  error: errorReducer,
  currentBuilding: selectBuildingReducer,
  buildings: buildingsReducer,
  resources: resourcesReducer,
  rules: setRulesReducer,
  troops: troopsReducer,
  login: loginReducer,
});

export default rootReducer;
