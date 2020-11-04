import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../app';
import { battleService } from '../../services';
import config from '../../config';

const token = jwt.sign({ kingdomId: 1 }, config.secret);

describe('GET /api/kingdom/battle/:enemyId ', () => {
  it('calls battleService and returns json object with battle results', (done) => {
    const spyBattle = jest.spyOn(battleService, 'handleBattle');
    spyBattle.mockReturnValue({
      message: 'it works',
    });
    request(app)
      .get('/api/kingdom/battle/2')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({ message: 'it works' });
        return done();
      });
  });
});
