import { rulesService } from '..';
import { rules } from '../../utils/rules';

test('getRules shoud return an object with the rules', () => {
  const expected = {
    build: rules.build(),
    upgrade: rules.upgrade(),
  };
  const actual = rulesService.getRules();

  expect(actual).toEqual(expected);
});

test('getRules returns error if return value is undefined', () => {
  const spyBuildRules = jest.spyOn(rules, 'build');
  const spyUpgradeRules = jest.fn(rules, 'upgrade');
  spyBuildRules.mockReturnValue(undefined);
  spyUpgradeRules.mockReturnValue(undefined);
  let thrownError = {};
  try {
    rulesService.getRules();
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ message: 'Something went wrong...', status: 500 });
});
