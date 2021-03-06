import { resourceRepo, kingdomRepo } from '../repositories';

export const resourceService = {

  async getResources(kingdomId) {
    const kingdom = await kingdomRepo.getKingdom(kingdomId);
    if (kingdom.results.length === 0) {
      throw { message: 'Bad Request', status: 404 };
    }

    const kingdomResources = await resourceRepo.getResources(kingdomId);
    const resources = kingdomResources.results;
    return resources;
  },

  async updateResources(kingdomId) {
    const kingdom = await kingdomRepo.getKingdom(kingdomId);
    if (kingdom.results.length === 0) {
      throw { message: 'Bad Request', status: 404 };
    }

    return await resourceRepo.updateResources(kingdomId);
  },

};
