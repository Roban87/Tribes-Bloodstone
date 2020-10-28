import { kingdomRepo } from '../repositories';

export const registerMapService = {
  checkLocation(location) {
    if (location === undefined) {
      return {
        message: 'Country code is required.',
        status: 422,
      };
    }
    return undefined;
  },

  async postRegisterMap(kingdomId, location) {
    const checker = this.checkLocation(location);
    if (checker !== undefined) {
      throw checker;
    }
    await kingdomRepo.postRegisterMap(kingdomId, location);
  },
  async getKingdomMap() {
    return await kingdomRepo.getKingdomMap();
  },
};
