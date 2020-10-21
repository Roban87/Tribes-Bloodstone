import { buildingsRepo } from '../repositories';
import { resourceRepo } from '../repositories';
import { troopsRepo } from '../repositories';
import { kingdomRepo } from '../repositories';

export const kingdomUpdateNameService = {
  emptyNameValidator(kingdomname) {
    if (kingdomname === undefined) {
      throw {
        message: 'Name is required.',
        status: 400,
      };
    }
  },
  async selectKingdomInformations(kingdom_id) {
    const kingdomTable = await kingdomRepo.getKingdom(kingdom_id);
    const buildingsWithKingdomId = await buildingsRepo.getBuildings(kingdom_id);
    const resourceWithKingdomId = await resourceRepo.getResources(kingdom_id);
    const troopsWithKingdomId = await troopsRepo.getTroops(kingdom_id);
    return {
      id: kingdomTable.results[0].id,
      name: kingdomTable.results[0].kingdomname,
      userId: kingdomTable.results[0].user_id,
      buildings: buildingsWithKingdomId,
      resources: resourceWithKingdomId.results,
      troops: troopsWithKingdomId.results,
      location: kingdomTable.results[0].location,
    };
  },
  async kingdomnameUpdateMainService(kingdomname, kingdom_id) {
    this.emptyNameValidator(kingdomname);
    await kingdomRepo.updateName(kingdomname, kingdom_id)
    return await this.selectKingdomInformations(kingdom_id);
  },
};
