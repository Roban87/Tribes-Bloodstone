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

export const setErrorMessage = (message) => ({ type: 'SET_ERROR', error: message });

export const setLoginError = (errorMessage) => ({ type: 'LOGIN_FAILED', payload: errorMessage });

export const setKingdomsError = (errorMessage) => ({ type: 'KINGDOMS_ERROR', payload: errorMessage });

export const setBattleError = (errorMessage) => ({ type: 'BATTLE_ERROR', payload: errorMessage });

export const removeBattleError = () => ({ type: 'CLEAR_BATTLE_ERROR' });
export const leaderboardError = (errorMessage) => ({ type: 'LEADERBOARD_ERROR', payload: errorMessage });
