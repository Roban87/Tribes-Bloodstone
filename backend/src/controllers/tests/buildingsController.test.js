import request from 'supertest';
import app from '../../app';
import { buildingsRepo, resourceRepo } from '../../repositories';
import { resourceService } from '../../services';
import jwt from 'jsonwebtoken';
import config from '../../config';

const token = jwt.sign('payload', config.secret);
const database = {
  buildings: [
    {
      id: 1,
      type: 'mine',
      level: 1,
      hp: 10,
      started_at: '2020-10-12T12:35:36.000Z',
      finished_at: null,
    },
    {
      id: 2,
      type: 'farm',
      level: 1,
      hp: 10,
      started_at: '2020-10-12T14:05:32.000Z',
      finished_at: null,
    },
    {
      id: 3,
      type: 'barracks',
      level: 1,
      hp: 10,
      started_at: '2020-10-13T09:34:30.000Z',
      finished_at: null,
    },
    {
      id: 4,
      type: 'townhall',
      level: 1,
      hp: 10,
      started_at: '2020-10-13T09:34:45.000Z',
      finished_at: null,
    },
    {
      id: 5,
      type: 'mine',
      level: 1,
      hp: 10,
      started_at: '2020-10-12T12:35:36.000Z',
      finished_at: null,
    },
  ],
};

describe('GET /api/kingdom/buildings', () => {
  it('responds with json containing the buildings of the kingdom', done => {
    let spy = jest.spyOn(buildingsRepo, 'getBuildings');
    spy.mockReturnValue( database.buildings );
    request(app)
      .get('/api/kingdom/buildings/1')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({buildings: database.buildings});
        done();
    });
  });
});

describe('GET api/kingdom/buildings/:kindomId/buildingId', () => {
  it('responds with a JSON containing the building specified by the building id', done => {
    let spy = jest.spyOn(buildingsRepo, 'getSingleBuilding');
    spy.mockReturnValue({ results: [database.buildings[0]], fields: [] });
    request(app)
      .get('/api/kingdom/buildings/1/1')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual(database.buildings[0]);
        done();
      });
  });
});

describe('POST /api/kingdom/buildings -> add new building tests', () => {

  it('missing type -> responds with error', done => {
    const spyUpdate = jest.spyOn(resourceService, 'updateResources');
    spyUpdate.mockReturnValue({});

    request(app)
    .post('/api/kingdom/buildings')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send({})
    .expect('Content-Type', /json/)
    .expect(500)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body).toEqual({ error: 'Type is required' });
      done();
    });
  });

  it('wrong type -> responds with error', done => {
    const spyUpdate = jest.spyOn(resourceService, 'updateResources');
    spyUpdate.mockReturnValue({});

    request(app)
    .post('/api/kingdom/buildings')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send({ type: 'library' })
    .expect('Content-Type', /json/)
    .expect(500)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body).toEqual({ error: 'Wrong type' });
      done();
    });
  });

  it('not enough money -> responds with error', done => {
    const spyUpdate = jest.spyOn(resourceService, 'updateResources');
    spyUpdate.mockReturnValue({});

    const spy = jest.spyOn(resourceRepo, 'getGoldAmount');
    spy.mockReturnValue([{amount: 80}]);

    request(app)
    .post('/api/kingdom/buildings')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send({ type: 'farm' })
    .expect('Content-Type', /json/)
    .expect(500)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body).toEqual({ error: 'You don\'t have enough money' });
      done();
    });
  });

  it('good type & enough gold-> responds with new building data', done => {
    const spyUpdate = jest.spyOn(resourceService, 'updateResources');
    spyUpdate.mockReturnValue({});

    const spyResource = jest.spyOn(resourceRepo, 'getGoldAmount');
    spyResource.mockReturnValue([{amount: 200}]);

    const spyResourceRate = jest.spyOn(resourceRepo, 'updateResourceRate');
    spyResourceRate.mockReturnValue(null);

    const spyBuildings = jest.spyOn(buildingsRepo, 'addNewBuilding');
    spyBuildings.mockReturnValue([{
      id: 5,
      type: 'farm',
      level: 1,
      hp: 100,
      started_at: '1603620911',
      finished_at: '1603620971',
      kingdom_id: 2
    }]);

    request(app)
    .post('/api/kingdom/buildings')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send({ type: 'farm' })
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body).toEqual({
        id: 5,
        type: 'farm',
        level: 1,
        hp: 100,
        started_at: '1603620911',
        finished_at: '1603620971',
        kingdom_id: 2
      });
      done();
    });
  });
});

describe('PUT api/kingdom/buildings/:kingdomId/:buildingId', () => {
  it('responds with a JSON object containing the updated building specified by the building id', done => {
    const spyGetBuildings = jest.spyOn(buildingsRepo, 'getBuildings');
    spyGetBuildings.mockReturnValue(database.buildings);
    const spyGetResources = jest.spyOn(resourceRepo, 'getResources');
    spyGetResources.mockReturnValue({results: [{ amount: 2000, type: 'gold' }]});
    const spySingleBuilding = jest.spyOn(buildingsRepo, 'getSingleBuilding');
    spySingleBuilding.mockReturnValue({results: [database.buildings[4]], fields: []});
    const spyUpgradeBuilding = jest.spyOn(buildingsRepo, 'upgradeBuilding');
    spyUpgradeBuilding.mockReturnValue(null);
    const spyPurchase = jest.spyOn(resourceRepo, 'handlePurchase');
    spyPurchase.mockReturnValue(null);
    const spyResourceRate = jest.spyOn(resourceRepo, 'updateResourceRate');
    spyResourceRate.mockReturnValue(null);

    request(app)
      .get('/api/kingdom/buildings/4/5')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual(database.buildings[4]);
        done();
      });
  });
});
<<<<<<< HEAD

=======
>>>>>>> fb8eead... rebase
