import { kingdomRepo } from '../repositories';

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
    return await kingdomRepo.postRegisterMap(kingdomId, location);
  },
  async getKingdomMap() {
    return await kingdomRepo.getKingdomMap();
  },
};
