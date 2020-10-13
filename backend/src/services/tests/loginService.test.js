import { loginService } from '../loginService';
import { loginRepo } from '../../repositories/loginRepo';

const database = {
  user1: {
    username: "marci",
    phash: '$2b$10$0BkmlcSgF4Vs8IxPqt8S/uKQDkBS3kNbCXCX0htPDcz0B/7605DFi',
    id: 1,
    kingdomid: 1,
  },
  user2: {
    username: "zoli",
    phash: '$2b$10$sWmdFqL87flO56Op4g79Eu/wTomkp7DVuU2rvb/MsunQAZSUsjxNu',
    id: 2,
    kingdomid: 2,
  },
  user3: {
    username: "peti",
    phash: '$2b$10$f0kByEGrCZ.78E.KVmONOOoskilCU8z7ctyGvwSKEqg715hIEy22u',
    id: 3,
    kingdomid: 3,
  }
}

test('missing username and password', async () => {
  let thrownError;
  try {
    await loginService.getToken(undefined, undefined);
  } catch(err) {
    thrownError = err 
  }
  expect(thrownError).toEqual({status: 400, message: 'All fields required'});
});

test('missing username',async () => {
  let thrownError;
  try {
    await loginService.getToken(undefined, 'password');
  } catch(err) {
    thrownError = err 
  }
  expect(thrownError).toEqual({status: 400, message: 'Username is required'});
}); 

test('missing password',async () => {
  let thrownError;
  try {
    await loginService.getToken('username', undefined);
  } catch(err) {
    thrownError = err 
  }
  expect(thrownError).toEqual({status: 400, message: 'Password is required'});
}); 

test('bad username',async () => {
  let thrownError;
  let spy = jest.spyOn(loginRepo, 'getUser');
  spy.mockReturnValue({results: [], fields: 'somedata'})
  try {
    await loginService.getToken('username', 'password');
  } catch(err) {
    thrownError = err 
  }
  expect(thrownError).toEqual({status: 400, message: 'Username or password is incorrect'});
}); 

test('bad password',async () => {
  let thrownError;
  let spy = jest.spyOn(loginRepo, 'getUser');
  spy.mockReturnValue({results: [database.user1], fields: 'somedata'})
  try {
    await loginService.getToken("marci", 'badpassword');
  } catch(err) {
    thrownError = err 
  }
  expect(thrownError).toEqual({status: 400, message: 'Username or password is incorrect'});
}); 

test('succesful login', async () => {
  let spy = jest.spyOn(loginRepo, 'getUser');
  spy.mockReturnValue({results: [database.user1], fields: 'somedata'})
  let token = await loginService.getToken("marci", 'password');
  expect(token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
})