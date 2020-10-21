import { combineReducers } from 'redux';
import exampleReducer from './exampleReducer';
import errorReducer from './errorReducer';
import selectBuildingReducer from './selectBuildingReducer';
import setBuildingsReducer from './setBuildingsReducer';

const rootReducer = combineReducers({
  example: exampleReducer,
  error: errorReducer,
  currentBuilding: selectBuildingReducer,
  buildings: setBuildingsReducer,
});

export default rootReducer;
