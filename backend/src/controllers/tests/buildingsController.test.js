import request from 'supertest';
import app from '../../app';
import { buildingsRepo } from '../../repositories/buildingsRepo';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { buildingsService } from '../../services';

const token = jwt.sign('payload',config.secret);

const database = {
  buildings: [
    {
      building_id: 1,
      type: 'mine',
      level: 1,
      hp: 10,
      started_at: '2020-10-12T12:35:36.000Z',
      finished_at: null,
    },
    {
      building_id: 2,
      type: 'farm',
      level: 1,
      hp: 10,
      started_at: '2020-10-12T14:05:32.000Z',
      finished_at: null,
    },
    {
      building_id: 3,
      type: 'barracks',
      level: 1,
      hp: 10,
      started_at: '2020-10-13T09:34:30.000Z',
      finished_at: null,
    },
    {
      building_id: 4,
      type: 'townhall',
      level: 1,
      hp: 10,
      started_at: '2020-10-13T09:34:45.000Z',
      finished_at: null,
    },
  ],
};

describe('GET /api/kingdom/buildings', () => {
  it('responds with json containing the buildings of the kingdom', done => {
    let spy = jest.spyOn(buildingsRepo, 'getBuildings');
    spy.mockReturnValue(database.buildings);
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
    spy.mockReturnValue({results: [database.buildings[0]], fields: []});
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
