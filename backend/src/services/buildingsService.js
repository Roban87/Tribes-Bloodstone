import { buildingsRepo } from '../repositories';

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
  }
};
