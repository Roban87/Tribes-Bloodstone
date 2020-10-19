import { regMapRepo } from '../repositories';

export const regMapService = {
  checkLocation(location) {
    if (location === undefined) {
      return {
        message: 'Country code is required.',
        status: 422,
      };
    }
  },
  async postRegMap(kingdomId, location) {
    const checker = this.checkLocation(location);
    if(checker !== undefined){
      throw checker;
    }
    return await regMapRepo.postRegMap(kingdomId, location);
  },
};
