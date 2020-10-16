import { resourceService } from '../resourceService';
import { resourceRepo } from '../../repositories';

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

test('invalid kingdomId', async () => {
  let spy = jest.spyOn(resourceRepo, 'getResources');
  spy.mockReturnValue({results: []});

  const invalidId = await resourceService.getResources(56);
  expect(invalidId).toEqual([]);
});

test('correct kingdomId', async () => {
  let spy = jest.spyOn(resourceRepo, 'getResources');
  spy.mockReturnValue({
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
