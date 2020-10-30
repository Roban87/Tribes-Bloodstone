import { rules } from '../utils/rules';

export const rulesService = {
  getRules() {
    const gameRules = {
      build: rules.build(),
      upgrade: rules.upgrade(),
    };
    if (!gameRules.build || !gameRules.upgrade) {
      throw {
        message: 'Something went wrong...',
        status: 500,
      };
    }
    return gameRules;
  },
};
