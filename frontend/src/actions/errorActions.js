export const setUpgradeError = (errorMessage) => ({ type: 'UPGRADE_ERROR', payload: errorMessage });

export const removeUpgradeError = () => ({ type: 'REMOVE_UPGRADE_ERROR' });

export const setBuildingsError = (errorMessage) => ({ type: 'BUILDINGS_ERROR', payload: errorMessage });

export const setRulesError = (errorMessage) => ({ type: 'RULES_ERROR', payload: errorMessage });

export const setResourceError = (errorMessage) => ({ type: 'RESOURCE_ERROR', payload: errorMessage });
