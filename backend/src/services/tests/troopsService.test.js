import { troopsRepo, buildingsRepo, resourceRepo } from '../../repositories';
import { troopsService } from '../troopsService';

const troopsDB = {
  troops: [{
    id: 1,
    level: 1,
    hp: 1,
    attack: 1,
    defence: 1,
    started_at: '2020-10-12T12:35:36.000Z',
    finished_at: null,
    kingdom_id: 1,
  },
  {
    id: 2,
    level: 3,
    hp: 1,
    attack: 1,
    defence: 1,
    started_at: '2020-10-11T12:35:36.000Z',
    finished_at: null,
    kingdom_id: 1,
  },
  ],
};

const buildingsDB = {
  buildings: [
    {
      id: 1,
      type: 'academy',
      level: 3,
      hp: 10,
      started_at: '2020-10-12T12:35:36.000Z',
      finished_at: null,
      kingdom_id: 1,
    },
  ],
};

test('returns object containing new troop', async () => {
  const spyHandlePurchase = jest.spyOn(resourceRepo, 'handlePurchase');
  spyHandlePurchase.mockReturnValue(null);
  const spyGetBuildings = jest.spyOn(buildingsRepo, 'getBuildings');
  spyGetBuildings.mockReturnValue([
    {
      id: 1,
      type: 'academy',
      level: 4,
    },
    {
      id: 2,
      type: 'townhall',
      level: 4,
    },
  ]);
  const spyGetTroops = jest.spyOn(troopsRepo, 'getTroops');
  spyGetTroops.mockReturnValue({ results: ['troop'] });
  const spyGetGoldAmount = jest.spyOn(resourceRepo, 'getGoldAmount');
  spyGetGoldAmount.mockReturnValue([{ amount: 500 }]);
  const spyAddTroop = jest.spyOn(troopsRepo, 'addTroop');
  spyAddTroop.mockReturnValue({ results: { insertId: 1 } });
  const spyGetSingleTroop = jest.spyOn(troopsRepo, 'getSingleTroop');
  spyGetSingleTroop.mockReturnValue({ results: ['troop'] });
  const spyUpdateResourceRate = jest.spyOn(resourceRepo, 'updateResourceRate');
  spyUpdateResourceRate.mockReturnValue(null);

  const troop = await troopsService.addTroop(1);

  expect(troop).toEqual('troop');
  expect(spyGetBuildings).toHaveBeenCalledWith(1);
  expect(spyGetTroops).toHaveBeenCalledWith(1);
  expect(spyGetGoldAmount).toHaveBeenCalledWith(1);
  expect(spyAddTroop).toHaveBeenCalled();
  expect(spyGetSingleTroop).toHaveBeenCalledWith(1, 1);
  expect(spyUpdateResourceRate).toHaveBeenCalledWith(1, 'food', -5);
});

test('no academy, returns error message', async () => {
  const spyGetBuildings = jest.spyOn(buildingsRepo, 'getBuildings');
  spyGetBuildings.mockReturnValue([
    {
      id: 2,
      type: 'townhall',
      level: 4,
    },
  ]);
  const spyGetTroops = jest.spyOn(troopsRepo, 'getTroops');
  spyGetTroops.mockReturnValue({ results: ['troop'] });

  let thrownError = {};

  try {
    await troopsService.addTroop(1);
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: 'You need an academy before you can add troop', status: 400 });
});

test('storage limit exceded, returns error message', async () => {
  const spyHandlePurchase = jest.spyOn(resourceRepo, 'handlePurchase');
  spyHandlePurchase.mockReturnValue(null);
  const spyGetBuildings = jest.spyOn(buildingsRepo, 'getBuildings');
  spyGetBuildings.mockReturnValue([
    {
      id: 1,
      type: 'academy',
      level: 1,
    },
    {
      id: 2,
      type: 'townhall',
      level: 1,
    },
  ]);
  const spyGetTroops = jest.spyOn(troopsRepo, 'getTroops');
  spyGetTroops.mockReturnValue(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']);

  let thrownError = {};

  try {
    await troopsService.addTroop(1);
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: 'You reached the storage limit, upgrade your Townhall first.', status: 400 });
});

test('not enough money, returns error message', async () => {
  const spyHandlePurchase = jest.spyOn(resourceRepo, 'handlePurchase');
  spyHandlePurchase.mockReturnValue(null);
  const spyGetBuildings = jest.spyOn(buildingsRepo, 'getBuildings');
  spyGetBuildings.mockReturnValue([
    {
      id: 1,
      type: 'academy',
      level: 4,
    },
    {
      id: 2,
      type: 'townhall',
      level: 4,
    },
  ]);
  const spyGetTroops = jest.spyOn(troopsRepo, 'getTroops');
  spyGetTroops.mockReturnValue({ results: ['troop'] });
  const spyGetGoldAmount = jest.spyOn(resourceRepo, 'getGoldAmount');
  spyGetGoldAmount.mockReturnValue([{ amount: 5 }]);

  let thrownError = {};

  try {
    await troopsService.addTroop(1);
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: 'You don\'t have enough money', status: 400 });
});

describe('upgrade troops test', () => {
  test('upgrade level is missing', async () => {
    try {
      await troopsService.upgradeTroops(undefined, 1, 1);
    } catch (err) {
      expect(err).toEqual({ message: 'Troop level is required', status: 400 });
    }
  });

  test('upgrade amount is missing', async () => {
    try {
      await troopsService.upgradeTroops(1, undefined, 1);
    } catch (err) {
      expect(err).toEqual({ message: 'Amount is required', status: 400 });
    }
  });

  test('academy level is low', async () => {
    const spy = jest.spyOn(buildingsRepo, 'getBuildings');
    spy.mockReturnValue(buildingsDB.buildings);
    try {
      await troopsService.upgradeTroops(5, 1, 1);
    } catch (err) {
      expect(err).toEqual({ message: 'Upgrade is not allowed, academy level is too low', status: 400 });
    }
  });

  test('amount is too much, not enough troops', async () => {
    const spyGetTroops = jest.spyOn(troopsRepo, 'getTroops');
    spyGetTroops.mockReturnValue(troopsDB.troops);
    const spy = jest.spyOn(buildingsRepo, 'getBuildings');
    spy.mockReturnValue(buildingsDB.buildings);
    try {
      await troopsService.upgradeTroops(1, 10, 1);
    } catch (err) {
      expect(err).toEqual({ message: 'Amount was too much, you have 1 troops in that troop level', status: 400 });
    }
  });

  test('not enough money for Upgrade, returns error message', async () => {
    const spyGetTroops = jest.spyOn(troopsRepo, 'getTroops');
    spyGetTroops.mockReturnValue(troopsDB.troops);
    const spyGetGoldAmount = jest.spyOn(resourceRepo, 'getGoldAmount');
    spyGetGoldAmount.mockReturnValue([{ amount: 5 }]);
    const spyUpgradeTroops = jest.spyOn(troopsRepo, 'upgradeTroops');
    spyUpgradeTroops.mockReturnValue(troopsDB);

    try {
      await troopsService.upgradeTroops(1, 1, 1);
    } catch (err) {
      expect(err).toEqual({ message: 'You don\'t have enough money', status: 400 });
    }
  });

  test('upgrade troops completed', async () => {
    const spyGetTroops = jest.spyOn(troopsRepo, 'getTroops');
    spyGetTroops.mockReturnValue(troopsDB.troops);
    const spyGetGoldAmount = jest.spyOn(resourceRepo, 'getGoldAmount');
    spyGetGoldAmount.mockReturnValue([{ amount: 500 }]);
    const spyUpgradeTroops = jest.spyOn(troopsRepo, 'upgradeTroops');
    spyUpgradeTroops.mockReturnValue({ results: troopsDB });

    const troops = await troopsService.upgradeTroops(1, 1, 1);
    expect(troops).toEqual(troopsDB);
  });
});
