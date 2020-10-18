import { resourceRepo, kingdomRepo } from '../repositories';

export const resourceService = {

  async getResources(kingdomId) {
    let kingdom = await kingdomRepo.getKingdom(kingdomId);
    if (kingdom.results.length === 0 ) {
      throw { message: 'Bad Request', status: 404 };
    }

    let kingdomResources = await resourceRepo.getResources(kingdomId);
    const resources = kingdomResources.results;
    return resources;
  },

  async updateResources(kingdomId) {
      return await resourceRepo.updateResources(kingdomId);
  }

}