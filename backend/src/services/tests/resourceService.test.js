import { resourceRepo } from '../../repositories';
import { resourceService } from '../resourceService';

test('update resource service test: missing kingdomId', async () => {
  let errorInfo = await resourceService.updateResources(undefined);
  expect(errorInfo).toEqual({status: 500, error: 'Wrong Query'});
});

test('update resource service test: with kingdomId', async () => {
  let spy = jest.spyOn(resourceRepo, 'updateResources');
  spy.mockReturnValue({results: [], fields: 'sheeps'});

  let info = await resourceService.updateResources(56);
  expect(info).toEqual({results: [], fields: 'sheeps'});
});
