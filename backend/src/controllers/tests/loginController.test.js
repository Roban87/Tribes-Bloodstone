import request from 'supertest';
import app from '../../app';
import { userRepo } from '../../repositories';

const database = {
  user1: {
    username: 'marci',
    password: '$2b$10$0BkmlcSgF4Vs8IxPqt8S/uKQDkBS3kNbCXCX0htPDcz0B/7605DFi',
    id: 1,
    kingdomId: 1,
  },
  user2: {
    username: 'zoli',
    password: '$2b$10$sWmdFqL87flO56Op4g79Eu/wTomkp7DVuU2rvb/MsunQAZSUsjxNu',
    id: 2,
    kingdomId: 2,
  },
  user3: {
    username: 'peti',
    password: '$2b$10$f0kByEGrCZ.78E.KVmONOOoskilCU8z7ctyGvwSKEqg715hIEy22u',
    id: 3,
    kingdomId: 3,
  },
};

describe('POST /api/login', () => {
  it('responds with json that holds token', (done) => {
    const spy = jest.spyOn(userRepo, 'getUser');
    spy.mockReturnValue({ results: [database.user1], fields: 'somedata' });
    request(app)
      .post('/api/login')
      .send({ username: 'marci', password: 'password' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        if (!/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(res.body.token)) {
          throw new Error('Missing or bad token');
        }
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('POST /api/login', () => {
  it('missing username and password responds with error', (done) => {
    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('POST /api/login', () => {
  it('missing username responds with error', (done) => {
    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .send({ username: 'marci' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('POST /api/login', () => {
  it('missing password responds with error', (done) => {
    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .send({ password: 'password' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('POST /api/login', () => {
  it('bad username responds with error', (done) => {
    const spy = jest.spyOn(userRepo, 'getUser');
    spy.mockReturnValue({ results: [], fields: 'somedata' });
    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .send({ username: 'badusername', password: 'password' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('POST /api/login', () => {
  it('bad password responds with error', (done) => {
    const spy = jest.spyOn(userRepo, 'getUser');
    spy.mockReturnValue({ results: [database.user1], fields: 'somedata' });
    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .send({ username: 'marci', password: 'badpassword' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
