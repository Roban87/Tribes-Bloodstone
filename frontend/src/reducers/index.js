import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import selectBuildingReducer from './selectBuildingReducer';
import setBuildingsReducer from './setBuildingsReducer';
import resourcesReducer from './resourcesReducer';

const rootReducer = combineReducers({
  error: errorReducer,
  currentBuilding: selectBuildingReducer,
  buildings: setBuildingsReducer,
  resources: resourcesReducer,
});

export default rootReducer;
