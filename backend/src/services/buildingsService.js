import { buildingsRepo, resourceRepo } from '../repositories';
import { setRules } from '../helpers/rulesHelper';

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

    const kingdomWealth = await resourceRepo.getGoldAmount(kingdomId);
    if (kingdomWealth[0].amount < 100) {
      throw { status: 400, message: 'You don\'t have enough money'};
    }

    const addNewBuildingData = await buildingsRepo.addNewBuilding(type, kingdomId);
    return addNewBuildingData[0];
  },

  async upgradeBuilding(buildingId, kingdomId) {
    const allBuildings = await buildingsRepo.getBuildings(kingdomId);
    const townHall = allBuildings.filter((building) => building.type === "townhall")[0];
    const building = allBuildings.filter((building) => building.id == buildingId)[0];
    const rules = setRules(building.level);

    if (building.level == rules.townhall.maxLevel) {
      throw { message: "Building max level reached", status: 400 }
    }
    if (townHall.level <= building.level && building.type !== "townhall") {
      throw { message: "Townhall level is too low", status: 400 }
    }

    const resources = await resourceRepo.getResources(kingdomId);
    const gold = resources.results.filter((resource) => resource.type === "gold")[0];

    if (gold.amount < rules[building.type].price) {
      throw { message: "You don't have enough money", status: 400 }
    }

    await buildingsRepo.upgradeBuilding(building.id, rules[building.type].hp, rules[building.type].time);
    await resourceRepo.handlePurchase(kingdomId, rules[building.type].price);

    if (building.type === 'farm' || building.type === 'mine') {
      const resource = building.type === 'farm' ? 'food' : 'gold';
      await resourceRepo.updateResourceRate(kingdomId, resource, rules[building.type].generation);
    }

    const upgradedBuilding = await buildingsRepo.getSingleBuilding(buildingId);
    
    return upgradedBuilding.results[0];
  }
};
