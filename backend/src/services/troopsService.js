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
  async upgradeTroops(upgradeLevel, amount, kingdomId) {
    if (!upgradeLevel) {
      throw { message: 'Troop level is required', status: 400 };
    }
    if (!amount) {
      throw { message: 'Amount is required', status: 400 };
    }
    const allBuildings = await buildingsRepo.getBuildings(kingdomId);
    const academy = allBuildings.filter((building) => building.type === 'academy')[0];
    if (academy.level <= upgradeLevel) {
      throw { message: 'Upgrade is not allowed, academy level is too low', status: 400 };
    }
    const troopsQuery = await troopsRepo.getTroops(kingdomId);
    const troopsOfGivenLevel = troopsQuery.filter(
      (troop) => troop.level === Number(upgradeLevel),
    ).length;
    if (troopsOfGivenLevel < amount) {
      throw { message: `Amount was too much, you have ${troopsOfGivenLevel} troops in that troop level`, status: 400 };
    }
    const upgradeRules = await rules.upgrade();
    const troopPrice = upgradeRules.troops.price;
    const upgradePrice = upgradeLevel * troopPrice * amount;
    const gold = resourceRepo.getGoldAmount(kingdomId);
    if (upgradePrice > gold) {
      throw { message: 'You don\'t have enough money', status: 400 };
    }
    const upgradeTroops = await troopsRepo
      .upgradeTroops(amount, upgradeLevel, kingdomId, upgradeRules.troops);

    return upgradeTroops.results;
  },
};
