import { registerValidator } from '../registrationValidator';
import { registrationRepo } from '../../repositories/registrationRepo';
import { userRepo } from '../../repositories/userRepo';

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

test('missing username and password', () => {
  const errorMessage = registerValidator.validateUsernameAndPassword(
    undefined,
    undefined
  );
  expect(errorMessage).toEqual({
    message: 'Username and password is required.',
    status: 400,
  });
});

test('missing username', () => {
  const errorMessage = registerValidator.validateUsernameAndPassword(
    undefined,
    !undefined
  );
  expect(errorMessage).toEqual({
    message: 'Username is required.',
    status: 400,
  });
});

test('missing password', () => {
  const errorMessage = registerValidator.validateUsernameAndPassword(
    !undefined,
    undefined
  );
  expect(errorMessage).toEqual({
    message: 'Password is required.',
    status: 400,
  });
});
test('password must be 8 caracter check', () => {
  const errorMessage = registerValidator.validateUsernameAndPassword(
    !undefined,
    '1234567'
  );
  expect(errorMessage).toEqual({
    message: 'Password must be 8 characters.',
    status: 400,
  });
});

test('username already exist check', async () => {
  let spy = jest.spyOn(userRepo, 'getUserByUsername');
  spy.mockReturnValue({ results: [database.user1], fields: 'somedata' });
  let result = await registerValidator.userNameTaken('kornel');
  expect(result).toEqual({
    status: 400,
    message: 'Username is already taken.',
  });
});

test('successfull registration with kingdomname', async () => {
  let spySelectUser = jest.spyOn(userRepo, 'getUserByUsername');
  let spyInsertNew = jest.spyOn(registrationRepo, 'insertNewUserWithKingdom');
  spySelectUser.mockReturnValue({ results: [], fields: 'somedata' });
  spyInsertNew.mockReturnValue({
    results: [{ id: 1, username: 'kornel', kingdom_id: 1 }],
    fields: 'somedata',
  });
  let result = await registerValidator.registUser('kornel', 'asdasdasd');
  expect(result).toEqual({
    userId: 1,
    username: 'kornel',
    kingdomId: 1,
  });
});
test('successfull registration without kingdomname', async () => {
  let spySelectUser = jest.spyOn(userRepo, 'getUserByUsername');
  let spyInsertNew = jest.spyOn(registrationRepo, 'insertNewUserWithKingdom');
  spySelectUser.mockReturnValue({ results: [], fields: 'somedata' });
  spyInsertNew.mockReturnValue({
    results: [{ id: 1, username: 'kornel', kingdom_id: 1 }],
    fields: 'somedata',
  });
  let result = await registerValidator.registUser(
    'kornel',
    'asdasdasd',
    'KORNELKINGDOM'
  );
  expect(result).toEqual({
    userId: 1,
    username: 'kornel',
    kingdomId: 1,
  });
});
