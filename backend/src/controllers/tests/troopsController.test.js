import request from 'supertest';
import jwt from 'jsonwebtoken';
import { troopsService, resourceService } from '../../services';
import app from '../../app';
import config from '../../config';

const token = jwt.sign({ id: 1, kingdomId: 1 }, config.secret);

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
