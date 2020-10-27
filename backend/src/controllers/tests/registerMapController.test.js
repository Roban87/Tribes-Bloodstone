import request from 'supertest';
import app from '../../app';
import { kingdomRepo, buildingsRepo, troopsRepo } from '../../repositories';
import jwt from 'jsonwebtoken';
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
      started_at: 12345789,
      finished_at: 12399999,
    },
  ],
  resources: [
    {
      type: 'food',
      amount: 1,
      generation: 1,
    },
    {
      type: 'gold',
      amount: 1,
      generation: 1,
    },
  ],
  troops: [
    {
      id: 1,
      level: 1,
      hp: 1,
      attack: 1,
      defence: 1,
      started_at: 12345789,
      finished_at: 12399999,
    },
  ],
  location: {
    country_code: 'ENG',
  },
};

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
describe('GET /api/kingdom/map', () => {
  it('responds with json containing the kingdoms', done => {
    let spy = jest.spyOn(kingdomRepo, 'getKingdomMap');
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
        done();
      });
  });
});

describe('POST /api/register/map/:kingdomId', () => {
  it('responds with json containing the kingdom data', done => {
    let spyBuildings = jest.spyOn(buildingsRepo, 'getBuildings');
    spyBuildings.mockReturnValue(buildingsDB);
    let spyTroops = jest.spyOn(troopsRepo, 'getTroops');
    spyTroops.mockReturnValue({ results: troopsDB, fields: 'somedata' });
    let spy = jest.spyOn(kingdomRepo, 'postRegisterMap');
    spy.mockReturnValue(postResponse);
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
        done();
      });
  });
});

describe('POST /api/register/map/:kingdomId', () => {
  it('responds error message', done => {
    request(app)
      .post('/api/register/map/1')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(422)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});
