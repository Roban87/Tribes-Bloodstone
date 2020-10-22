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
    this.checkLocation(location);
    return await kingdomRepo.postRegisterMap(kingdomId, location);
  },
  async getKingdomMap() {
    return await kingdomRepo.getKingdomMap();
  },
};
