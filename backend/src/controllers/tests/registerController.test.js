<<<<<<< HEAD
<<<<<<< HEAD
import { userRepo } from '../../repositories/userRepo';
import { registerValidator } from '../../services/registrationValidator';
import request from 'supertest';
import app from '../../app';

const database = {
  user1: {
    id: 1,
    username: 'kornel',
    password: '12345678',
  },
  user2: {
    id: 2,
    username: 'szabi',
    password: 'asdasdasdasd',
  },
};
describe('POST /api/register', () => {
  it('without username and password responds with error', done => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .send({})
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
describe('POST /api/register', () => {
  it('without password responds with error', done => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .send({ username: 'kornel' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /api/register', () => {
  it('without username responds with error', done => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .send({ username: 'kornel' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
describe('POST /api/register', () => {
  it('without less than 9 caracter password responds with error', done => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .send({ username: 'kornel', password: '1234567' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /api/register', () => {
  let spySelectUser = jest.spyOn(userRepo, 'getUserByUsername');
  let spyInsertNew = jest.spyOn(registerValidator, 'insertNewUser');
  spySelectUser.mockReturnValue({
    results: [database.user1],
    fields: 'somedata',
  });
  spyInsertNew.mockReturnValue({
    results: [{ id: 1, username: 'kornel', kingdom_id: 1 }],
    fields: 'somedata',
  });
  it('with valid username and password responds with the new user', done => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .send({ username: 'kornel', password: 'asdasdasd' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /api/register', () => {
  let spySelectUser = jest.spyOn(userRepo, 'getUserByUsername');
  let spyInsertNew = jest.spyOn(registerValidator, 'insertNewUser');
  spySelectUser.mockReturnValue({ results: [], fields: 'somedata' });
  spyInsertNew.mockReturnValue({
    results: [{ id: 1, username: 'kornel', kingdom_id: 1 }],
    fields: 'somedata',
  });
  it('with valid username, password and kingdomname responds with the new user', done => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .send({
        username: 'kornel',
        password: 'asdasdasd',
        kingdomname: 'KORNELKINGDOM',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
=======
import { registrationRepo } from "../../repositories/registrationRepo";
=======
import { registrationRepo } from '../../repositories/registrationRepo';
import { userRepo } from '../../repositories/userRepo';
>>>>>>> 45f55ff... pull request needed refactoring ready
import request from 'supertest';
import app from '../../app';

const database = {
  user1: {
    id: 1,
    username: 'kornel',
    password: '12345678',
  },
  user2: {
    id: 2,
    username: 'szabi',
    password: 'asdasdasdasd',
  },
};
describe('POST /api/register', () => {
  it('without username and password responds with error', done => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .send({})
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
describe('POST /api/register', () => {
  it('without password responds with error', done => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .send({ username: 'kornel' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /api/register', () => {
  it('without username responds with error', done => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .send({ username: 'kornel' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
describe('POST /api/register', () => {
  it('without less than 9 caracter password responds with error', done => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .send({ username: 'kornel', password: '1234567' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /api/register', () => {
  let spySelectUser = jest.spyOn(userRepo, 'getUserByUsername');
  let spyInsertNew = jest.spyOn(registrationRepo, 'insertNewUserWithKingdom');
  spySelectUser.mockReturnValue({
    results: [database.user1],
    fields: 'somedata',
  });
  spyInsertNew.mockReturnValue({
    results: [{ id: 1, username: 'kornel', kingdom_id: 1 }],
    fields: 'somedata',
  });
  it('with valid username and password responds with the new user', done => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .send({ username: 'kornel', password: 'asdasdasd' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

<<<<<<< HEAD
  describe('POST /api/register', () => {
    let spySelectUser = jest.spyOn(registrationRepo, 'getUserByUsername');
    let spyInsertNew = jest.spyOn(registrationRepo, 'insertNewUserWithKingdom');
    spySelectUser.mockReturnValue({ results: [], fields: 'somedata' });
    spyInsertNew.mockReturnValue({results: [{id: 1, username: "kornel", kingdom_id: 1}], fields: 'somedata'})
    it('with valid username, password and kingdomname responds with the new user', (done) => {
      request(app)
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({username: "kornel", password: 'asdasdasd', kingdomname: 'KORNELKINGDOM'})
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });
>>>>>>> d6ca02b... registerController sending back a single message
=======
describe('POST /api/register', () => {
  let spySelectUser = jest.spyOn(userRepo, 'getUserByUsername');
  let spyInsertNew = jest.spyOn(registrationRepo, 'insertNewUserWithKingdom');
  spySelectUser.mockReturnValue({ results: [], fields: 'somedata' });
  spyInsertNew.mockReturnValue({
    results: [{ id: 1, username: 'kornel', kingdom_id: 1 }],
    fields: 'somedata',
  });
  it('with valid username, password and kingdomname responds with the new user', done => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .send({
        username: 'kornel',
        password: 'asdasdasd',
        kingdomname: 'KORNELKINGDOM',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
>>>>>>> 45f55ff... pull request needed refactoring ready
