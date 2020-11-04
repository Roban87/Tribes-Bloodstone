import { resourceRepo, troopsRepo, buildingsRepo } from '../../repositories';
import { battleService } from '../battleService';
import * as shuffleArray from '../../utils/shuffleArray';

beforeAll(() => {
  const mockMath = Object.create(global.Math);
  mockMath.round = () => 1;
  global.Math = mockMath;
  troopsRepo.removeTroops = jest.fn();
  troopsRepo.injureTroop = jest.fn();
  buildingsRepo.resetBuildingsAfterBattle = jest.fn();
  buildingsRepo.removeBuilding = jest.fn();
  resourceRepo.updateResourceRate = jest.fn();
  resourceRepo.updateResourceAfterBattle = jest.fn();
  resourceRepo.updateResourceRate = jest.fn();
  shuffleArray.shuffle = jest.fn((array) => array);
});

test('checkBattleResult returns TIE if equal power', () => {
  const expected = 'TIE';
  const actual = battleService.checkBattleResult(5, 5);
  expect(actual).toEqual(expected);
});

test('checkBattleResult returns VICTORY if user has higher power', () => {
  const expected = 'VICTORY';
  const actual = battleService.checkBattleResult(5, 2);
  expect(actual).toEqual(expected);
});

test('checkBattleResult returns DEFEAT if enemy has higher power', () => {
  const expected = 'DEFEAT';
  const actual = battleService.checkBattleResult(2, 5);
  expect(actual).toEqual(expected);
});

test('calculateTroopCasualties returns object with casualties and injured troops', async () => {
  const userPower = 40;
  const enemyPower = 20;
  const userTroops = [
    {
      id: 1,
      hp: 10,
      defence: 5,
    },
    {
      id: 2,
      hp: 10,
      defence: 3,
    },
  ];
  const enemyTroops = [
    {
      id: 3,
      hp: 10,
      defence: 5,

    },
    {
      id: 4,
      hp: 10,
      defence: 5,
    },
    {
      id: 5,
      hp: 20,
      defence: 5,
    },
  ];
  const actual = await battleService.calculateTroopCasualties(userTroops,
    enemyTroops,
    userPower,
    enemyPower);
  expect(actual).toEqual({
    userCasualties: 1,
    enemyCasualties: 2,
  });
});

test('handleBuildingcasualties returns string with destroyed building level and type if buidling is destroyed', async () => {
  const buildings = [
    {
      type: 'mine',
      level: 4,
    },
  ];
  const actual = await battleService.handleBuildingCasualties(1, buildings);
  expect(actual).toEqual('Level 4 mine');
});

test('handleBuildingcasualties null if no mine or farm found', async () => {
  const buildings = [
    {
      type: 'academy',
      level: 4,
    },
  ];
  const actual = await battleService.handleBuildingCasualties(1, buildings);
  expect(actual).toEqual(null);
});

test('handleBattle returns object with battle results', async () => {
  troopsRepo.getTroops = jest.fn((id) => {
    if (id === 1) {
      return [
        {
          id: 1,
          attack: 20,
          hp: 10,
          defence: 5,
          finishedAt: '2020-11-05 10:22:37',
        },
        {
          id: 2,
          attack: 20,
          hp: 10,
          defence: 3,
          finishedAt: '2020-11-05 10:22:37',
        },
      ];
    }
    return [
      {
        id: 3,
        attack: 5,
        hp: 10,
        defence: 5,
        finishedAt: '2020-11-05 10:22:37',
      },
      {
        id: 4,
        attack: 10,
        hp: 10,
        defence: 5,
        finishedAt: '2020-11-05 10:22:37',
      },
      {
        id: 5,
        attack: 5,
        hp: 20,
        defence: 5,
        finishedAt: '2020-11-05 10:22:37',
      },
    ];
  });
  buildingsRepo.getBuildings = jest.fn((id) => {
    if (id === 1) {
      return [
        {
          type: 'academy',
          level: 4,
          finishedAt: '2020-11-05 10:22:37',
        },
      ];
    }
    return [
      {
        type: 'mine',
        level: 4,
        finishedAt: '2020-11-05 10:22:37',
      },
    ];
  });
  const spy = jest.spyOn(resourceRepo, 'getResources');
  spy.mockReturnValue({
    results: [
      {
        type: 'gold',
        amount: 500,
      },
      {
        type: 'food',
        amount: 500,
      },
    ],
  });
  const spyAllocateBounty = jest.spyOn(battleService, 'allocateBounty');
  spyAllocateBounty.mockReturnValue(null);
  const actual = await battleService.handleBattle(1, 2);
  expect(actual).toEqual({
    stat: {
      message: 'VICTORY',
      myKingdom_troops: 1,
      myKingdom_died_troops: 1,
      myKingdom_buildings_lost: 'none',
      enemy_troops: 1,
      enemy_died_troops: 2,
      enemy_buildings_lost: 'Level 4 mine',
      resourceChange: {
        gold: 250,
        food: 250,
      },
    },
  });
});

test('handleBattle returns error if player has no buildings', async () => {
  troopsRepo.getTroops = jest.fn((id) => {
    if (id === 1) {
      return [];
    }
    return [
      {
        id: 3,
        attack: 5,
        hp: 10,
        defence: 5,
        finishedAt: '2020-11-05 10:22:37',
      },
    ];
  });
  buildingsRepo.getBuildings = jest.fn((id) => {
    if (id === 1) {
      return [
        {
          type: 'academy',
          level: 4,
          finishedAt: '2020-11-05 10:22:37',
        },
      ];
    }
    return [
      {
        type: 'mine',
        level: 4,
        finishedAt: '2020-11-05 10:22:37',
      },
    ];
  });
  const spy = jest.spyOn(resourceRepo, 'getResources');
  spy.mockReturnValue({
    results: [
      {
        type: 'gold',
        amount: 500,
      },
      {
        type: 'food',
        amount: 500,
      },
    ],
  });
  let thrownError = '';
  try {
    await battleService.handleBattle(1, 2);
  } catch (err) {
    thrownError = err.message;
  }
  expect(thrownError).toEqual('You don\'t have any troops');
});
