import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../app';
import {
  kingdomRepo,
  buildingsRepo,
  troopsRepo,
  resourceRepo,
} from '../../repositories';
import config from '../../config';

const token = jwt.sign('payload', config.secret);

const database = {
  kingdoms: [
    {
      id: 1,
      kingdomname: 'king1',
      population: 100,
      location: 'ENG',
    },
    {
      id: 2,
      kingdomname: 'king2',
      population: 200,
      location: 'GER',
    },
    {
      id: 3,
      kingdomname: 'king3',
      population: 150,
      location: 'FRA',
    },
    {
      id: 4,
      kingdomname: 'king4',
      population: 130,
      location: 'HUN',
    },
  ],
};

const postResponse = {
  id: 1,
  name: 'London',
  userId: 1,
  buildings: [
    {
      id: 1,
      type: 'townhall',
      level: 1,
      hp: 1,
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
  location: {
    country_code: 'ENG',
  },
};

const buildingsDB = [
  {
    id: 1,
    type: 'townhall',
    level: 1,
    hp: 1,
    started_at: null,
    finished_at: null,
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

const kingdomDB = [
  {
    id: 1,
    kingdomname: 'London',
    population: 100,
    user_id: 1,
    location: 'ENG',
  },
];

describe('GET /api/kingdom/map', () => {
  it('responds with json containing the kingdoms', (done) => {
    const spy = jest.spyOn(kingdomRepo, 'getKingdomMap');
    spy.mockReturnValue(database.kingdoms);
    request(app)
      .get('/api/kingdom/map')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({ kingdoms: database.kingdoms });
        return done();
      });
  });
});

describe('POST /api/register/map/:kingdomId', () => {
  it('responds with json containing the kingdom data', (done) => {
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
    const spy = jest.spyOn(kingdomRepo, 'postRegisterMap');
    spy.mockReturnValue({});
    const locationBody = {
      countryCode: 'ENG',
    };
    request(app)
      .post('/api/register/map/1')
      .send(locationBody)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual(postResponse);
        return done();
      });
  });
});

describe('POST /api/register/map/:kingdomId', () => {
  it('responds error message', (done) => {
    request(app)
      .post('/api/register/map/1')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(422)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
