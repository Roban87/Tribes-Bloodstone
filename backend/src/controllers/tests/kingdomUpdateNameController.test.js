import { kingdomRepo } from '../../repositories';
import { buildingsRepo } from '../../repositories';
import { resourceRepo } from '../../repositories';
import { troopsRepo } from '../../repositories';
import request from 'supertest';
import app from '../../app';
import jwt from 'jsonwebtoken';
import config from '../../config';

const token = jwt.sign({id: 1, kingdomId: 1},config.secret);
console.log(config.secret);


const kingdomDB = [
  {
    id: 1,
    kingdomname: 'futys',
    population: null,
    location: null,
    user_id: 1,
  }
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

describe('PUT /api/kingdom', () => {
  it('without name respons with error', done => {
    request(app)
      .put('/api/kingdom')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .send({})
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});


describe('PUT /api/kingdom', () => {
    let spyUpdate = jest.spyOn(kingdomRepo, 'updateName');
    spyUpdate.mockReturnValue({});
    let spyKingdom = jest.spyOn(kingdomRepo, 'getKingdom');
    spyKingdom.mockReturnValue({
      results: kingdomDB,
      fields: 'somedata',
    });
    let spyBuildings = jest.spyOn(buildingsRepo, 'getBuildings');
    spyBuildings.mockReturnValue( buildingsDB );
    let spyResources = jest.spyOn(resourceRepo, 'getResources');
    spyResources.mockReturnValue({ results: resourcesDB, fields: 'somedata' });
    let spyTroops = jest.spyOn(troopsRepo, 'getTroops');
    spyTroops.mockReturnValue({ results: troopsDB, fields: 'somedata' });
    it('with good kingdomname select the kingdom informations', done => {
      request(app)
        .put('/api/kingdom')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .send({ name: 'futys' })
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });