import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../app';
import { resourceRepo, kingdomRepo } from '../../repositories';
import config from '../../config';

const token = jwt.sign('payload', config.secret);

const database = {
  resource1: {
    type: 'food',
    amount: 250,
    generation: 1,
    updatedAt: 1602609804,
  },
  resource2: {
    type: 'gold',
    amount: 250,
    generation: 1,
    updatedAt: 1602609804,
  },
  resource3: {
    type: 'food',
    amount: 250,
    generation: 1,
    updatedAt: 1602609804,
  },
  resource4: {
    type: 'gold',
    amount: 250,
    generation: 1,
    updatedAt: 1602609804,
  },
  resource5: {
    type: 'food',
    amount: 250,
    generation: 1,
    updatedAt: 1602609804,
  },
  resource6: {
    type: 'gold',
    amount: 250,
    generation: 1,
    updatedAt: 1602609804,
  },
};

const kingdom = {
  kingdom3: {
    id: 3,
  },
};

describe('GET request on /api/kingdom/resource', () => {
  it('missing kingdomId', (done) => {
    request(app)
      .get('/api/kingdom/resource/')
      .set('Authorization', `Bearer ${token}`)
      .set('user', {})
      .expect(404)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('wrong kingdomId', (done) => {
    const spyKingdom = jest.spyOn(kingdomRepo, 'getKingdom');
    spyKingdom.mockReturnValue({
      results: [],
    });

    const spy = jest.spyOn(resourceRepo, 'getResources');
    spy.mockReturnValue({ results: [], fields: 'sheeps' });

    request(app)
      .get('/api/kingdom/resource/23')
      .set('Authorization', `Bearer ${token}`)
      .set('user', { kingdomId: 23 })
      .expect(404)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('correct kingdomId', (done) => {
    const spyKingdom = jest.spyOn(kingdomRepo, 'getKingdom');
    spyKingdom.mockReturnValue({
      results: [
        kingdom.kingdom3,
      ],
    });

    const spy = jest.spyOn(resourceRepo, 'getResources');
    spy.mockReturnValue({ results: [database.resource1, database.resource2], fields: 'sheeps' });

    request(app)
      .get('/api/kingdom/resource/3')
      .set('Authorization', `Bearer ${token}`)
      .set('user', { kingdomId: 3 })
      .expect(200)
      .expect({
        resources: [
          {
            type: 'food',
            amount: 250,
            generation: 1,
            updatedAt: 1602609804,
          },
          {
            type: 'gold',
            amount: 250,
            generation: 1,
            updatedAt: 1602609804,
          },
        ],
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
