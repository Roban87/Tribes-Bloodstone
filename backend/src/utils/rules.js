export const rules = {
  upgrade() {
    return {
      townhall: {
        maxLevel: 10,
        storageLimit: 20,
        price: 200,
        time: 60,
        hp: 200,
      },
      farm: {
        price: 100,
        time: 60,
        generation: 5,
        hp: 100,
      },
      mine: {
        price: 100,
        time: 60,
        generation: 5,
        hp: 100,
      },
      academy: {
        price: 100,
        time: 60,
        hp: 150,
      },
      troops: {
        price: 25,
        time: 30,
        food: 5,
        hp: 20,
        attack: 10,
        defense: 5,
      },
    };
  },
  build() {
    return {
      townhall: {
        maxLevel: 10,
        storageLimit: 20,
        price: 200,
        time: 120,
        hp: 200,
      },
      farm: {
        price: 100,
        time: 60,
        generation: 5,
        hp: 100,
      },
      mine: {
        price: 100,
        time: 60,
        generation: 5,
        hp: 100,
      },
      academy: {
        price: 150,
        time: 90,
        hp: 150,
      },
      troops: {
        price: 25,
        time: 30,
        food: 5,
        hp: 20,
        attack: 10,
        defense: 5,
      },
    };
  },
};
