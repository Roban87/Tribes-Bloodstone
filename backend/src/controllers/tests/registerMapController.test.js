import request from 'supertest';
import app from '../../app';
import { kingdomRepo } from '../../repositories/';
import jwt from 'jsonwebtoken';
import config from '../../config';

const token = jwt.sign('payload',config.secret);

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
