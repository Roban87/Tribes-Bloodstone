import { buildingsRepo } from '../repositories';

export const buildingsService = {
  async getBuildings(kingdomId) {
    return await buildingsRepo.getBuildings(kingdomId);
  },
  async getSingleBuilding(buildingId) {
    const queryResult = await buildingsRepo.getSingleBuilding(buildingId);
    const buildingData = queryResult.results[0];
    if (!buildingData) {
      throw { message: "Building could not be found", status: 400 }
    }
    return buildingData;
  }
};
