import updateResources from '../update-resources';

test('update middleware test: next have been called', async () => {
  const req = jest.fn(); 
  const res = { sendStatus: jest.fn() };
  const next = jest.fn();
  await updateResources(req, res, next);
  expect(next).toHaveBeenCalled();
});
