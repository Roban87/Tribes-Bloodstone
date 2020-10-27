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
    return;
  },
  async getKingdomMap() {
    return await kingdomRepo.getKingdomMap();
  },
};
