import { db } from '../../data/connection';
import { loginService } from '../loginService';

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
  try {
    await loginService.getToken('username', 'password');
  } catch(err) {
    thrownError = err 
  }
  expect(thrownError).toEqual({status: 400, message: 'Username or password is incorrect'});
}); 

test('bad password',async () => {
  let thrownError;
  try {
    await loginService.getToken("marci", 'badpassword');
  } catch(err) {
    thrownError = err 
  }
  expect(thrownError).toEqual({status: 400, message: 'Username or password is incorrect'});
}); 

test('succesful login', async () => {
  let token = await loginService.getToken("marci", 'password');
  expect(token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
})