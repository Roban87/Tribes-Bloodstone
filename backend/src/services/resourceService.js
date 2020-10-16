import { resourceRepo } from '../repositories';

export const resourceService = {

  async getResources(kingdomId) {
    let result = await resourceRepo.getResources(kingdomId);
    const resources = result.results;
    return resources;
  },

}