import request from 'supertest';
import jwt from 'jsonwebtoken';
import { rulesService } from '../../services';
import app from '../../app';
import config from '../../config';

const token = jwt.sign('payload', config.secret);

describe('GET api/rules', () => {
  it('should return a json object with rules', (done) => {
    const gameRules = rulesService.getRules();

    request(app)
      .get('/api/rules')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual(gameRules);
        return done();
      });
  });
});
