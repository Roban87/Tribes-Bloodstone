import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import selectBuildingReducer from './selectBuildingReducer';
import setBuildingsReducer from './setBuildingsReducer';
import resourcesReducer from './resourcesReducer';
import setRulesReducer from './rulesReducer';

const rootReducer = combineReducers({
  error: errorReducer,
  currentBuilding: selectBuildingReducer,
  buildings: setBuildingsReducer,
  resources: resourcesReducer,
  rules: setRulesReducer,
});

export default rootReducer;
