import { troopsRepo, buildingsRepo, resourceRepo } from '../repositories';
import { rules } from '../utils/rules';

export const troopsService = {
  async addTroop(kingdomId) {
    const allBuildings = await buildingsRepo.getBuildings(kingdomId);
    const troopsQuery = await troopsRepo.getTroops(kingdomId);
    const numOfTroops = troopsQuery.length;
    const townHall = allBuildings.filter((building) => building.type === 'townhall')[0];
    const academy = allBuildings.filter((building) => building.type === 'academy')[0];
    const buildRules = rules.build();
    const storageLimit = buildRules.townhall.storageLimit * townHall.level;
    const troopPrice = buildRules.troops.price;
    const foodConsumption = buildRules.troops.food;

    if (!academy) {
      throw { message: 'You need an academy before you can add troop', status: 400 };
    }
    if (storageLimit <= numOfTroops) {
      throw { message: 'You reached the storage limit, upgrade your Townhall first.', status: 400 };
    }
    const gold = await resourceRepo.getGoldAmount(kingdomId);
    if (gold[0].amount < troopPrice) {
      throw { message: 'You don\'t have enough money', status: 400 };
    }
    const insertQuery = await troopsRepo.addTroop(kingdomId, buildRules.troops);
    await resourceRepo.handlePurchase(kingdomId, troopPrice);
    await resourceRepo.updateResourceRate(kingdomId, 'food', foodConsumption);
    const newTroop = await troopsRepo.getSingleTroop(kingdomId, insertQuery.results.insertId);
    return newTroop.results[0];
  },
};
