/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { resourceRepo, buildingsRepo, troopsRepo } from '../repositories';
import { shuffle } from '../utils/shuffleArray';
import { rules } from '../utils/rules';

export const battleService = {
  checkBattleResult(userPower, enemyPower) {
    let result = '';
    if (userPower === enemyPower) {
      result = 'TIE';
    }
    if (userPower > enemyPower) {
      result = 'VICTORY';
    }
    if (enemyPower > userPower) {
      result = 'DEFEAT';
    }
    return result;
  },

  async calculateTroopCasualties(userTroops, enemyTroops, userPower, enemyPower) {
    shuffle(userTroops);
    shuffle(enemyTroops);
    const userCasualties = [];
    const enemyCasualties = [];
    let userInjuredTroop;
    let enemyInjuredTroop;
    let userAttack = userPower;
    let enemyAttack = enemyPower;
    userTroops.forEach((troop) => {
      const totalDefense = troop.hp + troop.defence;
      if (enemyAttack > 0) {
        if (enemyAttack >= totalDefense) {
          userCasualties.push(troop.id);
        } else {
          troop.hp = enemyAttack < troop.defence ? troop.hp : troop.hp - (enemyAttack - troop.defence);
          userInjuredTroop = troop;
        }
        enemyAttack -= totalDefense;
      }
    });
    enemyTroops.forEach((troop) => {
      const totalDefense = troop.hp + troop.defence;

      if (userAttack > 0) {
        if (userAttack >= totalDefense) {
          enemyCasualties.push(troop.id);
        } else {
          troop.hp = userAttack < troop.defence ? troop.hp : troop.hp - (userAttack - troop.defence);
          enemyInjuredTroop = troop;
        }
        userAttack -= totalDefense;
      }
    });

    if (userCasualties.length > 0) {
      await troopsRepo.removeTroops(userCasualties);
    }
    if (enemyCasualties.length > 0) {
      await troopsRepo.removeTroops(enemyCasualties);
    }
    if (userInjuredTroop) {
      await troopsRepo.injureTroop(userInjuredTroop);
    }
    if (enemyInjuredTroop) {
      await troopsRepo.injureTroop(enemyInjuredTroop);
    }
    return {
      userCasualties: userCasualties.length,
      enemyCasualties: enemyCasualties.length,
    };
  },
  async handleBuildingCasualties(kingdomId, buildings) {
    await buildingsRepo.resetBuildingsAfterBattle(kingdomId);
    const resourceBuildings = buildings.filter((building) => building.type === 'farm' || building.type === 'mine');
    if (resourceBuildings.length !== 0 && Math.round(Math.random() * 2) === 1) {
      shuffle(resourceBuildings);
      await buildingsRepo.removeBuilding(resourceBuildings[0].id);
      const buildingRules = rules.upgrade()[resourceBuildings[0].type];
      const generation = buildingRules.generation * resourceBuildings[0].level;
      const resourceType = resourceBuildings[0].type === 'farm' ? 'food' : 'gold';
      await resourceRepo.updateResourceRate(kingdomId, resourceType, -generation);
      return `Level ${resourceBuildings[0].level} ${resourceBuildings[0].type}`;
    }
    return null;
  },
  async allocateBounty(winnerId, loserId, goldAmount, foodAmount) {
    await resourceRepo.updateResourceAfterBattle(winnerId, goldAmount, foodAmount);
    await resourceRepo.updateResourceAfterBattle(loserId, -goldAmount, -foodAmount);
  },
  async handleBattle(userKingdomId, enemyKingdomId) {
    const resultMessage = {
      stat: {
        message: '',
        myKingdom_troops: 0,
        myKingdom_died_troops: 0,
        myKingdom_buildings_lost: 'none',
        enemy_troops: 0,
        enemy_died_troops: 0,
        enemy_buildings_lost: 'none',
        resourceChange: {
          gold: 0,
          food: 0,
        },
      },
    };
    const userTroopsQuery = await troopsRepo.getTroops(userKingdomId);
    const enemyTroopsQuery = await troopsRepo.getTroops(enemyKingdomId);
    const userBuildingsQuery = await buildingsRepo.getBuildings(userKingdomId);
    const enemyBuildingsQuery = await buildingsRepo.getBuildings(enemyKingdomId);
    const userResourcesQuery = await resourceRepo.getResources(userKingdomId);
    const enemyResourcesQuery = await resourceRepo.getResources(enemyKingdomId);
    const userGold = userResourcesQuery.results.filter((resource) => resource.type === 'gold')[0].amount;
    const userFood = userResourcesQuery.results.filter((resource) => resource.type === 'food')[0].amount;
    const enemyGold = enemyResourcesQuery.results.filter((resource) => resource.type === 'gold')[0].amount;
    const enemyFood = enemyResourcesQuery.results.filter((resource) => resource.type === 'food')[0].amount;
    const userTroops = userTroopsQuery.filter((troop) => {
      const previousUpgradeTime = new Date(troop.finishedAt).getTime();
      const currentTime = new Date().getTime();
      return currentTime > previousUpgradeTime;
    }) || [];
    const enemyTroops = enemyTroopsQuery.filter((troop) => {
      const previousUpgradeTime = new Date(troop.finishedAt).getTime();
      const currentTime = new Date().getTime();
      return currentTime > previousUpgradeTime;
    }) || [];
    const userBuildings = userBuildingsQuery.filter((building) => {
      const previousUpgradeTime = new Date(building.finishedAt).getTime();
      const currentTime = new Date().getTime();
      return currentTime > previousUpgradeTime;
    });
    const enemyBuildings = enemyBuildingsQuery.filter((building) => {
      const previousUpgradeTime = new Date(building.finishedAt).getTime();
      const currentTime = new Date().getTime();
      return currentTime > previousUpgradeTime;
    });
    const userPower = userTroops.reduce((acc, troop) => {
      acc += troop.attack;
      return acc;
    }, 0) || 0;
    const enemyPower = enemyTroops.reduce((acc, troop) => {
      acc += troop.attack;
      return acc;
    }, 0) || 0;
    resultMessage.stat.enemy_troops = enemyTroops.length;
    resultMessage.stat.myKingdom_troops = userTroops.length;
    if (userTroops.length === 0) {
      throw {
        message: 'You don\'t have any troops',
      };
    }
    if (enemyTroops.length > 0) {
      const casualties = await this.calculateTroopCasualties(
        userTroops,
        enemyTroops,
        userPower,
        enemyPower,
      );
      const troopFoodConsumption = rules.build().troops.food;
      if (casualties.userCasualties > 0) {
        await resourceRepo.updateResourceRate(userKingdomId, 'food', -(troopFoodConsumption * casualties.userCasualties));
      }
      if (casualties.enemyCasualties > 0) {
        await resourceRepo.updateResourceRate(enemyKingdomId, 'food', -(troopFoodConsumption * casualties.enemyCasualties));
      }
      resultMessage.stat.myKingdom_troops = userTroops.length - casualties.userCasualties;
      resultMessage.stat.myKingdom_died_troops = casualties.userCasualties;
      resultMessage.stat.enemy_troops = enemyTroops.length - casualties.enemyCasualties;
      resultMessage.stat.enemy_died_troops = casualties.enemyCasualties;
    }
    const battleResult = this.checkBattleResult(userPower, enemyPower);
    resultMessage.stat.message = battleResult;
    if (battleResult === 'VICTORY') {
      const buildingCasualty = await this.handleBuildingCasualties(enemyKingdomId, enemyBuildings);
      if (buildingCasualty !== null) {
        resultMessage.stat.enemy_buildings_lost = buildingCasualty;
      }
      const foodBounty = enemyFood / 2;
      const goldBounty = enemyGold / 2;
      resultMessage.stat.resourceChange.food = foodBounty;
      resultMessage.stat.resourceChange.gold = goldBounty;
      await this.allocateBounty(userKingdomId, enemyKingdomId, goldBounty, foodBounty);
    }
    if (battleResult === 'DEFEAT') {
      const buildingCasualty = await this.handleBuildingCasualties(userKingdomId, userBuildings);
      if (buildingCasualty !== null) {
        resultMessage.stat.user_buildings_lost = buildingCasualty;
      }
      const foodBounty = userFood / 2;
      const goldBounty = userGold / 2;
      resultMessage.stat.resourceChange.food = -foodBounty;
      resultMessage.stat.resourceChange.gold = -goldBounty;
      await this.allocateBounty(enemyKingdomId, userKingdomId, goldBounty, foodBounty);
    }
    return resultMessage;
  },
};
