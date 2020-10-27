import { buildingsRepo, resourceRepo } from '../repositories';
import { rules } from '../utils/rules';

export const buildingsService = {
  
  async getBuildings(kingdomId) {
    return await buildingsRepo.getBuildings(kingdomId);
  },
  
  async getSingleBuilding(buildingId, kingdomId) {
    const queryResult = await buildingsRepo.getSingleBuilding(buildingId);
    const buildingData = queryResult.results[0];
    if (!buildingData || buildingData.kingdom_id !== kingdomId) {
      throw { message: "Something went wrong...", status: 400 };
    }
    return buildingData;
  },

  async addBuilding(type, kingdomId) {
    if (!type) { 
      throw { status: 400, message: 'Type is required' };
    } else if (type !== 'farm' &&  type !== 'mine') {
      throw { status: 400, message: 'Wrong type' };
    }
    const buildRules = rules.build();
    const kingdomWealth = await resourceRepo.getGoldAmount(kingdomId);
    if (kingdomWealth[0].amount < buildRules[type].price) {
      throw { status: 400, message: 'You don\'t have enough money'};
    }

    const addNewBuildingData = await buildingsRepo.addNewBuilding(type, kingdomId, buildRules[type].price);
    const resource = type === 'farm' ? 'food' : 'gold';
    await resourceRepo.updateResourceRate(kingdomId, resource, buildRules[type].generation )
    return addNewBuildingData[0];
  },

  async upgradeBuilding(buildingId, kingdomId) {
    const allBuildings = await buildingsRepo.getBuildings(kingdomId);
    const townHall = allBuildings.filter((building) => building.type === "townhall")[0];
    const building = allBuildings.filter((building) => building.id == buildingId)[0];
    const upgradeRules = rules.upgrade();

    if (building.level == upgradeRules.townhall.maxLevel) {
      throw { message: "Building max level reached", status: 400 }
    }
    if (townHall.level <= building.level && building.type !== "townhall") {
      throw { message: "Townhall level is too low", status: 400 }
    }

    const gold = await resourceRepo.getGoldAmount(kingdomId);

    if (gold[0].amount < upgradeRules[building.type].price) {
      throw { message: "You don't have enough money", status: 400 }
    }

    await buildingsRepo.upgradeBuilding(building.id, upgradeRules[building.type].hp, upgradeRules[building.type].time);
    await resourceRepo.handlePurchase(kingdomId, upgradeRules[building.type].price);

    if (building.type === 'farm' || building.type === 'mine') {
      const resource = building.type === 'farm' ? 'food' : 'gold';
      await resourceRepo.updateResourceRate(kingdomId, resource, upgradeRules[building.type].generation);
    }

    const upgradedBuilding = await buildingsRepo.getSingleBuilding(buildingId);
    
    return upgradedBuilding.results[0];
  }
};
