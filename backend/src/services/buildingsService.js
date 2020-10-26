import { buildingsRepo, resourceRepo } from '../repositories';

export const buildingsService = {
  
  async getBuildings(kingdomId) {
    return await buildingsRepo.getBuildings(kingdomId);
  },
  
  async getSingleBuilding(buildingId, kingdomId) {
    const queryResult = await buildingsRepo.getSingleBuilding(buildingId);
    const buildingData = queryResult.results[0];
    if (!buildingData || buildingData.kingdom_id !== kingdomId) {
      throw { message: "Something went wrong...", status: 400 };
    }
    return buildingData;
  },

  async addBuilding(type, kingdomId) {
    if (!type) { 
      throw { status: 400, message: 'Type is required' };
    } else if (type !== 'farm' &&  type !== 'mine') {
      throw { status: 400, message: 'Wrong type' };
    }

    const kingdomWealth = await resourceRepo.getGoldAmount(kingdomId);
    if (kingdomWealth[0].amount < 100) {
      throw { status: 400, message: 'You don\'t have enough money'};
    }

    const addNewBuildingData = await buildingsRepo.addNewBuilding(type, kingdomId);
    return addNewBuildingData[0];
  },

};
