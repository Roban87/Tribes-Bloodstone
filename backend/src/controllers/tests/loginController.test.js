import request from 'supertest';
import { db } from '../../data/connection';
import app from '../../app';

beforeAll(async () => {
  let hash1 = '$2b$10$0BkmlcSgF4Vs8IxPqt8S/uKQDkBS3kNbCXCX0htPDcz0B/7605DFi'
  let hash2 = '$2b$10$sWmdFqL87flO56Op4g79Eu/wTomkp7DVuU2rvb/MsunQAZSUsjxNu'
  let hash3 = '$2b$10$f0kByEGrCZ.78E.KVmONOOoskilCU8z7ctyGvwSKEqg715hIEy22u'
  let password1  = 'password';
  let password2 = "secret";
  let password3 = "topsecret";
  let user1 = "marci";
  let user2 = "zoli";
  let user3 = "peti";
  await db.query('INSERT INTO users (username, phash, kingdomid) VALUES ?', [[[user1, hash1, 1], [user2, hash2, 2], [user3, hash3, 3]]]);
});

afterAll(async () => {
  await db.query('TRUNCATE users');
});

describe('POST /api/login', () => {
  it('responds with json that holds token', (done) => {
    request(app)
      .post('/api/login')
      .send({username: 'marci', password: 'password'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        if (!/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(res.body.token)) {
          throw new Error('Missing or bad token');
        }
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
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
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /api/login', () => {
  it('missing username responds with error', (done) => {
    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .send({username: "marci"})
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /api/login', () => {
  it('missing password responds with error', (done) => {
    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .send({password: "password"})
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /api/login', () => {
  it('bad username responds with error', (done) => {
    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .send({username: "badusername", password: "password"})
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /api/login', () => {
  it('bad password responds with error', (done) => {
    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .send({username: "marci", password: "badpassword"})
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});