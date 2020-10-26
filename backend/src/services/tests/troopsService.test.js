import { troopsRepo, buildingsRepo, resourceRepo } from '../../repositories';
import { troopsService } from '../troopsService';

test('returns object containing new troop', async () => {
  let spyGetBuildings = jest.spyOn(buildingsRepo, 'getBuildings');
  spyGetBuildings.mockReturnValue([
    {
      id: 1,
      type: 'academy',
      level: 4,
    },
    {
      id: 2,
      type: 'townhall',
      level: 4
    }   
  ]);
  let spyGetTroops = jest.spyOn(troopsRepo, 'getTroops');
  spyGetTroops.mockReturnValue({results: ['troop']});
  let spyGetGoldAmount = jest.spyOn(resourceRepo, 'getGoldAmount');
  spyGetGoldAmount.mockReturnValue([{amount: 500}]);
  let spyAddTroop = jest.spyOn(troopsRepo, 'addTroop');
  spyAddTroop.mockReturnValue({ results: { insertId: 1 } });
  let spyGetSingleTroop = jest.spyOn(troopsRepo, 'getSingleTroop');
  spyGetSingleTroop.mockReturnValue({results: ['troop']});
  let spyUpdateResourceRate = jest.spyOn(resourceRepo, 'updateResourceRate');
  spyUpdateResourceRate.mockReturnValue(null);

  let troop = await troopsService.addTroop(1);

  expect(troop).toEqual('troop');
  expect(spyGetBuildings).toHaveBeenCalledWith(1);
  expect(spyGetTroops).toHaveBeenCalledWith(1);
  expect(spyGetGoldAmount).toHaveBeenCalledWith(1);
  expect(spyAddTroop).toHaveBeenCalled();
  expect(spyGetSingleTroop).toHaveBeenCalledWith(1, 1);
  expect(spyUpdateResourceRate).toHaveBeenCalledWith(1, 'food', -5);
});

test('no academy, returns error message', async () => {
  let spyGetBuildings = jest.spyOn(buildingsRepo, 'getBuildings');
  spyGetBuildings.mockReturnValue([
    {
      id: 2,
      type: 'townhall',
      level: 4
    }   
  ]);
  let spyGetTroops = jest.spyOn(troopsRepo, 'getTroops');
  spyGetTroops.mockReturnValue({results: ['troop']});

  let thrownError = {};

  try {
    await troopsService.addTroop(1);
  } catch(err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: 'You need an academy before you can add troop', status: 400 });
});

test('storage limit exceded, returns error message', async () => {
  let spyGetBuildings = jest.spyOn(buildingsRepo, 'getBuildings');
  spyGetBuildings.mockReturnValue([
    {
      id: 1,
      type: 'academy',
      level: 1,
    },
    {
      id: 2,
      type: 'townhall',
      level: 1
    }   
  ]);
  let spyGetTroops = jest.spyOn(troopsRepo, 'getTroops');
  spyGetTroops.mockReturnValue({results: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]});

  let thrownError = {};

  try {
    await troopsService.addTroop(1);
  } catch(err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: 'You reached the storage limit, upgrade your Townhall first.', status: 400 });
});

test('not enough money, returns error message', async () => {
  let spyGetBuildings = jest.spyOn(buildingsRepo, 'getBuildings');
  spyGetBuildings.mockReturnValue([
    {
      id: 1,
      type: 'academy',
      level: 4,
    },
    {
      id: 2,
      type: 'townhall',
      level: 4
    }   
  ]);
  let spyGetTroops = jest.spyOn(troopsRepo, 'getTroops');
  spyGetTroops.mockReturnValue({results: ['troop']});
  let spyGetGoldAmount = jest.spyOn(resourceRepo, 'getGoldAmount');
  spyGetGoldAmount.mockReturnValue([{ amount: 5 }]);

  let thrownError = {};

  try {
    await troopsService.addTroop(1);
  } catch(err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: 'You don\'t have enough money', status: 400 });
});