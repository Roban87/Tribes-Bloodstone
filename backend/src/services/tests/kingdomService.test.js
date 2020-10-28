import { kingdomService } from '../kingdomService';
import {
  kingdomRepo, buildingsRepo, resourceRepo, troopsRepo,
} from '../../repositories';

const kingdomDB = [
  {
    id: 1,
    kingdomname: 'futys',
    population: null,
    location: null,
    user_id: 1,
  },
];

const buildingsDB = [
  {
    id: 1,
    type: 'gold',
    level: 1,
    hp: 5,
    started_at: null,
    finished_at: null,
  },
  {
    id: 2,
    type: 'silver',
    level: 2,
    hp: 222,
    started_at: null,
    finished_at: null,
  },
];
const resourcesDB = [
  {
    type: 'nothing',
    amount: 5,
    generation: 1,
    updatedAt: 1603281789,
  },
  {
    type: 'somethin',
    amount: 2,
    generation: 1,
    updatedAt: 1603284687,
  },
];
const troopsDB = [
  {
    id: 1,
    level: 1,
    hp: 1,
    attack: 1,
    defence: 1,
    started_at: null,
    finished_at: null,
  },
];
test('missing name', () => {
  expect(() => {
    kingdomService.emptyNameValidator(undefined);
  }).toThrow({
    message: 'Name is required.',
  });
});

test('select kingdom informations', async () => {
  const spyKingdom = jest.spyOn(kingdomRepo, 'getKingdom');
  spyKingdom.mockReturnValue({
    results: kingdomDB,
    fields: 'somedata',
  });
  const spyBuildings = jest.spyOn(buildingsRepo, 'getBuildings');
  spyBuildings.mockReturnValue(buildingsDB);
  const spyResources = jest.spyOn(resourceRepo, 'getResources');
  spyResources.mockReturnValue({ results: resourcesDB, fields: 'somedata' });
  const spyTroops = jest.spyOn(troopsRepo, 'getTroops');
  spyTroops.mockReturnValue(troopsDB);
  const result = await kingdomService.selectKingdomInformations('futys');
  expect(result).toEqual({
    id: 1,
    name: 'futys',
    userId: 1,
    buildings: [
      {
        id: 1,
        type: 'gold',
        level: 1,
        hp: 5,
        started_at: null,
        finished_at: null,
      },
      {
        id: 2,
        type: 'silver',
        level: 2,
        hp: 222,
        started_at: null,
        finished_at: null,
      },
    ],
    resources: [
      {
        type: 'nothing',
        amount: 5,
        generation: 1,
        updatedAt: 1603281789,
      },
      {
        type: 'somethin',
        amount: 2,
        generation: 1,
        updatedAt: 1603284687,
      },
    ],
    troops: [
      {
        id: 1,
        level: 1,
        hp: 1,
        attack: 1,
        defence: 1,
        started_at: null,
        finished_at: null,
      },
    ],
    location: { country_code: null },
  });
});
