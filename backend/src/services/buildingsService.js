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
    const buildings = await buildingsRepo.getBuildings(kingdomId);
    const townHall = buildings.find((building) => building.name === "townhall");
    const selectedBuilding = buildings.find((building) => building.id === buildingId);
    const rules = setRules(selectedBuilding.level);
    if (selectedBuilding.level == rules.townhall.maxLevel) {
      throw { message: "Building max level reached", status: 400 }
    }
    if (townHall.level <= selectedBuilding.level && selectedBuilding.type !== "townhall") {
      throw { message: "Townhall level is too low", status: 400 }
    }
    const resources = await resourceRepo.getResources(kingdomId);
    const gold = resources.results.find((resource) => resource.type === "gold");
    if (gold.amount < rules[selectedBuilding.type].price) {
      throw { message: "You don't have enough money", status: 400 }
    }
    await buildingsRepo.upgradeBuilding(selectedBuilding.id, rules[selectedBuilding.type].hp, rules[selectedBuilding.type].time);
    if (selectedBuilding.type === 'farm' || selectedBuilding.type === 'mine') {
      const resource = selectedBuilding.type === 'farm' ? 'food' : 'gold';
      await resourceRepo.updateResourceRate(kingdomId, resource, rules[selectedBuilding.type].generation);
    }
    await resourceRepo.handlePurchase(kingdomId, rules[selectedBuilding.type].price);
    return await buildingsRepo.getSingleBuilding(buildingId);
  }
};
