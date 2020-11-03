export const setUpgradeError = (errorMessage) => ({ type: 'UPGRADE_ERROR', payload: errorMessage });

export const removeUpgradeError = () => ({ type: 'REMOVE_UPGRADE_ERROR' });

export const setBuildingsError = (errorMessage) => ({ type: 'BUILDINGS_ERROR', payload: errorMessage });

export const setRulesError = (errorMessage) => ({ type: 'RULES_ERROR', payload: errorMessage });

export const setResourceError = (errorMessage) => ({ type: 'RESOURCE_ERROR', payload: errorMessage });

export const setAddBuildingError = (errorMessage) => ({ type: 'ADD_BUILDING_ERROR', payload: errorMessage });

export const removeAddBuildingError = () => ({ type: 'REMOVE_ADD_BUILDING_ERROR' });

export const addTroopError = (errorMessage) => ({ type: 'ADD_TROOP_ERROR', payload: errorMessage });

export const removeAddTroopError = () => ({ type: 'REMOVE_ADD_TROOP_ERROR' });

export const setTroopsError = (errorMessage) => ({ type: 'TROOPS_ERROR', payload: errorMessage });
