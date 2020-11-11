import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../app';
import {
  buildingsRepo,
  kingdomRepo,
  resourceRepo,
  troopsRepo,
} from '../../repositories';
import { troopsService, resourceService } from '../../services';
import config from '../../config';

const token = jwt.sign('payload', config.secret);

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
const troopsDB = {
  troops: {
    id: 1,
    level: 1,
    hp: 1,
    attack: 1,
    defence: 1,
    started_at: null,
    finished_at: null,
  },
};

describe('GET /api/kingdom/troops', () => {
  it('responds with json containing the troops of the kingdom', (done) => {
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
    spyTroops.mockReturnValue(troopsDB.troops);
    request(app)
      .get('/api/kingdom/troops')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual(troopsDB);
        return done();
      });
  });
});

describe('POST api/kingdom/troops', () => {
  it('returns a JSON object of the newly added troop', (done) => {
    const spyAddTroop = jest.spyOn(troopsService, 'addTroop');
    spyAddTroop.mockReturnValue({ troop: 'troop' });
    const spyUpdate = jest.spyOn(resourceService, 'updateResources');
    spyUpdate.mockReturnValue(null);
    request(app)
      .post('/api/kingdom/troops')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({ troop: 'troop' });
        return done();
      });
  });
});

describe('PUT api/kingdom/troops', () => {
  it('returns a JSON object of the upgraded troop', (done) => {
    const spyAddTroop = jest.spyOn(troopsService, 'upgradeTroops');
    spyAddTroop.mockReturnValue(troopsDB.troops);
    // const spyUpdate = jest.spyOn(resourceService, 'updateResources');
    // spyUpdate.mockReturnValue(null);
    request(app)
      .put('/api/kingdom/troops')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ amout: 1, level: 1 })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual(troopsDB);
        return done();
      });
  });
});
