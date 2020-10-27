import { buildingsRepo, kingdomRepo, troopsRepo } from '../repositories';

export const registerMapService = {
  checkLocation(location) {
    if (location === undefined) {
      return {
        message: 'Country code is required.',
        status: 422,
      };
    }
  },
  async postRegisterMap(kingdomId, location) {
    const checker = this.checkLocation(location);
    if (checker !== undefined) {
      throw checker;
    }
    const kingdomData = await kingdomRepo.postRegisterMap(kingdomId, location);
    const buildingsData = await buildingsRepo.getBuildings(kingdomId);
    const troopsData = await troopsRepo.getTroops(kingdomId);
    kingdomData.buildings = buildingsData;
    kingdomData.troops = troopsData;
    return kingdomData;
  },
  async getKingdomMap() {
    return await kingdomRepo.getKingdomMap();
  },
};
