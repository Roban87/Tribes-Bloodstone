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

test('checkBattleOutcome returns TIE if equal power', () => {
  const expected = 'TIE';
  const actual = battleService.checkBattleOutcome(5, 5);
  expect(actual).toEqual(expected);
});

test('checkBattleOutcome returns VICTORY if user has higher power', () => {
  const expected = 'VICTORY';
  const actual = battleService.checkBattleOutcome(5, 2);
  expect(actual).toEqual(expected);
});

test('checkBattleOutcome returns DEFEAT if enemy has higher power', () => {
  const expected = 'DEFEAT';
  const actual = battleService.checkBattleOutcome(2, 5);
  expect(actual).toEqual(expected);
});

test('calculateInjuries returns number of dead troops', async () => {
  const troops = [
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
  const result = await battleService.calculateInjuries(35, troops);
  expect(result).toEqual(2);
});

test('calculateInjuries returns 0 if empty array', async () => {
  const result = await battleService.calculateInjuries(20, []);
  expect(result).toEqual(0);
});

test('calculateBattleResult returns object with casualties and victorystatus', async () => {
  const userTroops = [
    {
      id: 1,
      attack: 10,
      hp: 10,
      defence: 5,
    },
    {
      id: 2,
      attack: 20,
      hp: 10,
      defence: 3,
    },
  ];
  const enemyTroops = [
    {
      id: 3,
      attack: 10,
      hp: 10,
      defence: 5,

    },
    {
      id: 4,
      attack: 10,
      hp: 10,
      defence: 5,
    },
    {
      id: 5,
      attack: 5,
      hp: 20,
      defence: 5,
    },
  ];
  const spyInjuries = jest.spyOn(battleService, 'calculateInjuries');
  spyInjuries.mockReturnValueOnce(1);
  spyInjuries.mockReturnValueOnce(2);

  const actual = await battleService.calculateBattleResult(userTroops,
    enemyTroops);
  expect(actual).toEqual({
    message: 'VICTORY',
    userCasualties: 1,
    enemyCasualties: 2,
  });
});
test('allocateBounty returns object with food and gold props', async () => {
  const spyResources = jest.spyOn(resourceRepo, 'getResources');
  spyResources.mockReturnValue({
    results: [
      {
        type: 'food',
        amount: 400,
      },
      {
        type: 'gold',
        amount: 400,
      },
    ],
  });
  const result = await battleService.allocateBounty(1, 2, 'VICTORY');

  expect(result).toEqual({
    food: 200,
    gold: 200,
  });
});

test('allocateBounty returns negative amounts if DEFEAT', async () => {
  const spyResources = jest.spyOn(resourceRepo, 'getResources');
  spyResources.mockReturnValue({
    results: [
      {
        type: 'food',
        amount: 400,
      },
      {
        type: 'gold',
        amount: 400,
      },
    ],
  });
  const result = await battleService.allocateBounty(1, 2, 'DEFEAT');

  expect(result).toEqual({
    food: -200,
    gold: -200,
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

test('handleBuildingcasualties returns none if no mine, academy or farm found', async () => {
  const buildings = [
    {
      type: 'townhall',
      level: 4,
    },
  ];
  const actual = await battleService.handleBuildingCasualties(1, buildings);
  expect(actual).toEqual('none');
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
          type: 'townhall',
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
  spyAllocateBounty.mockReturnValue({
    gold: 250,
    food: 250,
  });
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
