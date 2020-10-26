export const rules = level => ({
  troops: {
    price: 10 * level,
    time: 1 + (0.5 * level),
    food: 1,
  },
  buildings: {
    gold: 100 * level,
    time: 1 + (0.5 * level),
    townhall: {
      maxLevel: 10,
      storageLimit: 20,
    },
    mine: {
      generation: 10 + (5 * level),
    },
    farm: {
      generation: 10 + (5 * level),
    },
  }
});