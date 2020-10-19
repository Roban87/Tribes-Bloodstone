import { resourceService } from '../resourceService';
import { resourceRepo, kingdomRepo } from '../../repositories';

const database = {
  resource1: {
    id: 1,
    kingdomId: 1,
    type: 'food',
    amount: 250,
    generation: 1,
    updatedAt: 1602609804
  },
  resource2: {
    id: 2,
    kingdomId: 1,
    type: 'gold',
    amount: 250,
    generation: 1,
    updatedAt: 1602609804
  },
  resource3: {
    id: 3,
    kingdomId: 2,
    type: 'food',
    amount: 250,
    generation: 1,
    updatedAt: 1602609804
  },
  resource4: {
    id: 4,
    kingdomId: 2,
    type: 'gold',
    amount: 250,
    generation: 1,
    updatedAt: 1602609804
  },
  resource5: {
    id: 5,
    kingdomId: 3,
    type: 'food',
    amount: 250,
    generation: 1,
    updatedAt: 1602609804
  },
  resource6: {
    id: 6,
    kingdomId: 3,
    type: 'gold',
    amount: 250,
    generation: 1,
    updatedAt: 1602609804
  },
}

let kingdom = {
  kingdom3 : {
    id: 3
  }
}

test('get resource service test: with kingdomId', async () => {
  let spyKingdom = jest.spyOn(kingdomRepo, 'getKingdom');
  spyKingdom.mockReturnValue({
    results: [
      kingdom.kingdom3
    ]
  });
  let spyResource = jest.spyOn(resourceRepo, 'getResources');
  spyResource.mockReturnValue({
    results: [
      database.resource5, 
      database.resource6
    ]
  });

  const invalidId = await resourceService.getResources(3);
  expect(invalidId).toEqual(
     [
      {
        id: 5,
        kingdomId: 3,
        type: 'food',
        amount: 250,
        generation: 1,
        updatedAt: 1602609804
      },
      {
        id: 6,
        kingdomId: 3,
        type: 'gold',
        amount: 250,
        generation: 1,
        updatedAt: 1602609804
      },
    ]
  );
});

test('update resource service test: with correct kingdomId', async () => {
  let spyKingdom = jest.spyOn(kingdomRepo, 'getKingdom');
  spyKingdom.mockReturnValue({
    results: [
      kingdom.kingdom3
    ]
  });

  let spy = jest.spyOn(resourceRepo, 'updateResources');
  spy.mockReturnValue({results: [], fields: 'sheeps'});

  let info = await resourceService.updateResources(3);
  expect(info).toEqual({results: [], fields: 'sheeps'});
});
