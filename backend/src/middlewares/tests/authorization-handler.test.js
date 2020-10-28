import jwt from 'jsonwebtoken';
import authHandler from '../authorization-handler';
import config from '../../config';

config.secret = 'secretKey';

const goodToken = jwt.sign({ id: 1, kingdomId: 1 }, 'secretKey');
const badToken = jwt.sign({ id: 1, kingdomId: 1 }, 'badKey');

const noTokenReq = {
  headers: {
    authorization: '',
  },
};
const badTokenReq = {
  headers: {
    authorization: `Bearer ${badToken}`,
  },
};
const goodTokenReq = {
  headers: {
    authorization: `Bearer ${goodToken}`,
  },
};

test('good token returns user property in request', () => {
  const next = jest.fn();
  const res = jest.fn();
  authHandler(goodTokenReq, res, next);
  expect(goodTokenReq.user.id).toEqual(1);
  expect(goodTokenReq.user.kingdomId).toEqual(1);
});

test('bad token returns error', (done) => {
  const res = jest.fn();
  const callback = (err) => {
    expect(err.message).toEqual('Invalid token');
    expect(err.status).toEqual(401);
    done();
  };
  authHandler(badTokenReq, res, callback);
});

test('no token returns error', (done) => {
  const res = jest.fn();
  const callback = (err) => {
    expect(err.message).toEqual('No token provided');
    expect(err.status).toEqual(401);
    done();
  };
  authHandler(noTokenReq, res, callback);
});
