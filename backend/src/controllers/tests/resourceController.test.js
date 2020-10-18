import request from 'supertest';
import app from '../../app';
import { resourceRepo, kingdomRepo } from '../../repositories';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { resourceController } from '../resourceController';

const token = jwt.sign('payload',config.secret);


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

test('update resource controller test: missing kingdomId', async () => {
  let requestMock = { body: { userId: 2}};
  
  let errorInfo = await resourceController.updateResources(requestMock);
  expect(errorInfo).toEqual({status: 500, error: 'Wrong Query'});
});

test('update resource service test: not valid kingdomId', async () => {
  let spy = jest.spyOn(resourceRepo, 'updateResources');
  spy.mockReturnValue({results: [], fields: 'sheeps'});
  let requestMock = { body: { kingdomId: 56}};

  let info = await resourceController.updateResources(requestMock);
  expect(info).toEqual({results: [], fields: 'sheeps'});
});

test('update resource service test: correct kingdomId', async () => {
  let spy = jest.spyOn(resourceRepo, 'updateResources');
  spy.mockReturnValue({results: [], fields: 'sheeps'});
  let requestMock = { body: { kingdomId: 1}};

  let info = await resourceController.updateResources(requestMock);
  expect(info).toEqual({results: [], fields: 'sheeps'});
});
