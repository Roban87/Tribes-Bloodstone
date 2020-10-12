import { buildingsRepo } from '../repositories';

export const buildingsService = {
  async getBuildings(kingdomId) {
    return await buildingsRepo.getBuildings(kingdomId);
  },
};
