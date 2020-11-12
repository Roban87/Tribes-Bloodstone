import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import LeaderboardBuildings from './LeaderboardBuildings';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Componenet loaded with data', () => {
  const store = {
    leaderboardBuildings: [{
      kingdomname: 'alma',
      buildingsLevel: 100,
    }, {
      kingdomname: 'cica',
      buildingsLevel: 99,
    }],
    error: {
      resourceError: '',
    },
  };

  act(() => {
    render(
      <LeaderboardBuildings buildings={store.leaderboardBuildings} />, container,
    );
  });

  expect(container.textContent).toBe('RankKingdomTotal Levels of Buildings1alma1002cica99Show More');
});

it('compoenent loaded with error message', () => {
  const store = {
    leaderboardBuildings: [],
    error: 'Faild to load Leaderboard! Please, refresh the page!',
  };

  act(() => {
    render(
      <LeaderboardBuildings
        buildings={store.leaderboardBuildings}
        error={store.error}
      />, container,
    );
  });

  expect(container.textContent).toBe('Faild to load Leaderboard! Please, refresh the page!');
});
