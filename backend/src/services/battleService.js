/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { resourceRepo, buildingsRepo, troopsRepo } from '../repositories';
import { shuffle } from '../utils/shuffleArray';
import { rules } from '../utils/rules';

export const battleService = {

  checkBattleOutcome(userPower, enemyPower) {
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

  async calculateInjuries(attackPower, troops) {
    const deadTroops = [];
    let injuredTroop;
    let totalAttack = attackPower;
    shuffle(troops);
    troops.forEach((troop) => {
      const totalDefense = troop.hp + troop.defence;
      if (totalAttack > 0) {
        if (totalAttack >= totalDefense) {
          deadTroops.push(troop.id);
        } else {
          troop.hp = totalAttack < troop.defence ? troop.hp : troop.hp - (totalAttack - troop.defence);
          injuredTroop = troop;
        }
        totalAttack -= totalDefense;
      }
    });
    if (deadTroops.length > 0) {
      await troopsRepo.removeTroops(deadTroops);
    }
    if (injuredTroop) {
      await troopsRepo.injureTroop(injuredTroop);
    }
    return deadTroops.length;
  },

  async calculateBattleResult(userTroops, enemyTroops) {
    const userPower = userTroops.reduce((acc, troop) => {
      acc += troop.attack;
      return acc;
    }, 0) || 0;
    const enemyPower = enemyTroops.reduce((acc, troop) => {
      acc += troop.attack;
      return acc;
    }, 0) || 0;
    const result = this.checkBattleOutcome(userPower, enemyPower);
    const userCasualties = await this.calculateInjuries(enemyPower, userTroops);
    const enemyCasualties = await this.calculateInjuries(userPower, enemyTroops);
    return {
      message: result,
      userCasualties,
      enemyCasualties,
    };
  },
  async handleBuildingCasualties(kingdomId, buildings) {
    await buildingsRepo.resetBuildingsAfterBattle(kingdomId);
    const resourceBuildings = buildings.filter((building) => building.type === 'farm' || building.type === 'mine' || building.type === 'academy');
    if (resourceBuildings.length !== 0 && Math.round(Math.random() * 2) === 1) {
      shuffle(resourceBuildings);
      await buildingsRepo.removeBuilding(resourceBuildings[0].id);
      const buildingRules = rules.upgrade()[resourceBuildings[0].type];
      const generation = buildingRules.generation * resourceBuildings[0].level;
      const resourceType = resourceBuildings[0].type === 'farm' ? 'food' : 'gold';
      await resourceRepo.updateResourceRate(kingdomId, resourceType, -generation);
      return `Level ${resourceBuildings[0].level} ${resourceBuildings[0].type}`;
    }
    return 'none';
  },
  async allocateBounty(userKingdomId, enemyKingdomId, battleResult) {
    let winnerId = userKingdomId;
    let loserId = enemyKingdomId;
    if (battleResult === 'DEFEAT') {
      winnerId = enemyKingdomId;
      loserId = userKingdomId;
    }
    const resourcesQuery = await resourceRepo.getResources(loserId);
    const foodBounty = resourcesQuery.results.filter((resource) => resource.type === 'food')[0].amount / 2;
    const goldBounty = resourcesQuery.results.filter((resource) => resource.type === 'gold')[0].amount / 2;
    await resourceRepo.updateResourceAfterBattle(winnerId, goldBounty, foodBounty);
    await resourceRepo.updateResourceAfterBattle(loserId, -goldBounty, -foodBounty);
    if (battleResult === 'DEFEAT') {
      return {
        food: -foodBounty,
        gold: -goldBounty,
      };
    }
    return {
      food: foodBounty,
      gold: goldBounty,
    };
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
    const isFinished = (finishedTime) => {
      const previousUpgradeTime = new Date(finishedTime).getTime();
      const currentTime = new Date().getTime();
      return currentTime > previousUpgradeTime;
    };
    const userTroops = userTroopsQuery.filter((troop) => isFinished(troop.finishedAt)) || [];
    const enemyTroops = enemyTroopsQuery.filter((troop) => isFinished(troop.finishedAt)) || [];
    const userBuildings = userBuildingsQuery.filter((building) => isFinished(building.finishedAt)) || [];
    const enemyBuildings = enemyBuildingsQuery.filter((building) => isFinished(building.finishedAt)) || [];
    resultMessage.stat.enemy_troops = enemyTroops.length;
    resultMessage.stat.myKingdom_troops = userTroops.length;
    if (userTroops.length === 0) {
      throw {
        message: 'You don\'t have any troops',
      };
    }
    if (enemyTroops.length > 0) {
      const battleResults = await this.calculateBattleResult(userTroops, enemyTroops);
      const troopFoodConsumption = rules.build().troops.food;
      if (battleResults.userCasualties > 0) {
        await resourceRepo.updateResourceRate(userKingdomId, 'food', -(troopFoodConsumption * battleResults.userCasualties));
      }
      if (battleResults.enemyCasualties > 0) {
        await resourceRepo.updateResourceRate(enemyKingdomId, 'food', -(troopFoodConsumption * battleResults.enemyCasualties));
      }
      resultMessage.stat.myKingdom_troops = userTroops.length - battleResults.userCasualties;
      resultMessage.stat.myKingdom_died_troops = battleResults.userCasualties;
      resultMessage.stat.enemy_troops = enemyTroops.length - battleResults.enemyCasualties;
      resultMessage.stat.enemy_died_troops = battleResults.enemyCasualties;
      resultMessage.stat.message = battleResults.message;
    } else {
      resultMessage.stat.message = 'VICTORY';
    }
    if (resultMessage.stat.message === 'VICTORY') {
      resultMessage.stat.enemy_buildings_lost = await this.handleBuildingCasualties(enemyKingdomId, enemyBuildings);
    }
    if (resultMessage.stat.message === 'DEFEAT') {
      resultMessage.stat.user_buildings_lost = await this.handleBuildingCasualties(userKingdomId, userBuildings);
    }
    const resourceBounty = await this.allocateBounty(userKingdomId, enemyKingdomId, resultMessage.stat.message);
    resultMessage.stat.resourceChange.food = resourceBounty.food;
    resultMessage.stat.resourceChange.gold = resourceBounty.gold;
    return resultMessage;
  },
};
