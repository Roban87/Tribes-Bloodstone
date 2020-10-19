import { regMapRepo } from '../repositories';

export const regMapService = {
  async postRegMap(kingdomId) {
    return await regMapRepo.postRegMap(kingdomId);
  },
};
