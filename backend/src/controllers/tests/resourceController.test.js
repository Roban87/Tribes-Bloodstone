import request from 'supertest';
import app from '../../app';
import { resourceRepo, kingdomRepo } from '../../repositories';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { resourceController } from '../resourceController';

const token = jwt.sign('payload', config.secret);

const database = {
  resource1: {
    type: 'food',
    amount: 250,
    generation: 1,
    updatedAt: 1602609804
  },
  resource2: {
    type: 'gold',
    amount: 250,
    generation: 1,
    updatedAt: 1602609804
  },
  resource3: {
    type: 'food',
    amount: 250,
    generation: 1,
    updatedAt: 1602609804
  },
  resource4: {
    type: 'gold',
    amount: 250,
    generation: 1,
    updatedAt: 1602609804
  },
  resource5: {
    type: 'food',
    amount: 250,
    generation: 1,
    updatedAt: 1602609804
  },
  resource6: {
    type: 'gold',
    amount: 250,
    generation: 1,
    updatedAt: 1602609804
  },
};

let kingdom = {
  kingdom3 : {
    id: 3
  }
};

describe('GET request on /api/kingdom/resource', () => {

  it('missing kingdomId', (done) => {
    request(app)
      .get(`/api/kingdom/resource/`)
      .set('Authorization', `Bearer ${token}`)
      .set('user', {})
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('wrong kingdomId', (done) => {
    let spyKingdom = jest.spyOn(kingdomRepo, 'getKingdom');
    spyKingdom.mockReturnValue({
      results: []
    });

    let spy = jest.spyOn(resourceRepo, 'getResources');
    spy.mockReturnValue({results: [], fields: 'sheeps'})

    request(app)
      .get('/api/kingdom/resource/23')
      .set('Authorization', `Bearer ${token}`)
      .set('user', {"kingdomId": 23})
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('correct kingdomId', (done) => {
    let spyKingdom = jest.spyOn(kingdomRepo, 'getKingdom');
    spyKingdom.mockReturnValue({
      results: [
        kingdom.kingdom3
      ]
    });

    let spy = jest.spyOn(resourceRepo, 'getResources');
    spy.mockReturnValue({results: [database.resource1, database.resource2], fields: 'sheeps'})

    request(app)
      .get('/api/kingdom/resource/3')
      .set('Authorization', `Bearer ${token}`)
      .set('user', {"kingdomId": 3})
      .expect(200)
      .expect({
        "resources": [
          {
            type: 'food',
            amount: 250,
            generation: 1,
            updatedAt: 1602609804
          },
          {
            type: 'gold',
            amount: 250,
            generation: 1,
            updatedAt: 1602609804
          }
        ]
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});