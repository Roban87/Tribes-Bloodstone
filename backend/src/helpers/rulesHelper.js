export const setRules = level => ({
  troops: {
    price: 25 + (25 * level),
    time: 30 + (30 * level),
    food: 5 + (5 * level),
    attack: 10 + (10 * level),
    defense: 5 + (5 * level),
  },
  townhall: {
    maxLevel: 10,
    storageLimit: 20,
    price: 200 * level,
    time: 120 + (60 * level),
    hp: 200 + (200 * level),
  },
  farm: {
    price: 100 + (100 * level),
    time: 60 + (60 * level),
    generation: 5 + (5 * level),
    hp: 100 + (100 * level),
  },
  mine: {
    price: 100 + (100 * level),
    time: 60 + (60 * level),
    generation: 5 + (5 * level),
    hp: 100 + (100 * level),
  },
  academy: {
    price: 150 + 100 * level,
    time: 90 + 60* level,
    hp: 150 + (150 * level),
  },
});
