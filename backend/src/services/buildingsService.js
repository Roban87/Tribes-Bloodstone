import { buildingsRepo } from '../repositories';

export const buildingsService = {
  async getBuildings(kingdomId) {
    return await buildingsRepo.getBuildings(kingdomId);
  },
  async getSingleBuilding(buildingId) {
    const queryResult = await buildingsRepo.getSingleBuilding(buildingId);
    const buildingData = queryResult.results[0];
    console.log(buildingData);
    if (!buildingData) {
      throw { message: "Something went wrong...", status: 400 }
    }
    return buildingData;
  }
};
