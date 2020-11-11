import {
  buildingsRepo,
  resourceRepo,
  troopsRepo,
  kingdomRepo,
} from '../repositories';

export const kingdomService = {
  emptyNameValidator(kingdomname) {
    if (kingdomname === undefined) {
      throw {
        message: 'Name is required.',
        status: 400,
      };
    }
  },
  async selectKingdomInformations(kingdomId) {
    const kingdomTable = await kingdomRepo.getKingdom(kingdomId);
    const buildingsWithKingdomId = await buildingsRepo.getBuildings(kingdomId);
    const resourceWithKingdomId = await resourceRepo.getResources(kingdomId);
    const troopsWithKingdomId = await troopsRepo.getTroops(kingdomId);
    return {
      id: kingdomTable.results[0].id,
      name: kingdomTable.results[0].kingdomname,
      userId: kingdomTable.results[0].user_id,
      buildings: buildingsWithKingdomId,
      resources: resourceWithKingdomId.results,
      troops: troopsWithKingdomId,
      location: { country_code: kingdomTable.results[0].location },
    };
  },
  async kingdomnameUpdateMainService(kingdomname, kingdomId) {
    this.emptyNameValidator(kingdomname);
    await kingdomRepo.updateName(kingdomname, kingdomId);
    return await this.selectKingdomInformations(kingdomId);
  },
  async getKingdom(kingdomId) {
    return await kingdomRepo.getKingdom(kingdomId);
  },
};
