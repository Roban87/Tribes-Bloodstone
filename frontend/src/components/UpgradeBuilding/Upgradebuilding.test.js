import React from 'react';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import UpgradeBuilding from './UpgradeBuilding';

const mockStore = configureStore([]);
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

it('renders with data', () => {
  const props = {
    building:
    {
      type: 'farm',
      id: 1,
      hp: 200,
      level: 2,
      startedAt: '2020-11-02T14:25:05.000Z',
      finishedAt: '2020-11-02T14:26:05.000Z',
    },
  };
  const store = mockStore({
    resources: {
      foodAmount: 200,
      foodGeneration: 5,
      goldAmount: 500,
      goldGeneration: 10,
      getResources: jest.fn(),
    },
    error: {
      upgradeError: '',
    },
    rules: {
      rules: {
        upgrade: {
          farm: {
            price: 100,
            hp: 100,
            time: 60,
          },
        },
      },
    },
  });
  store.dispatch = jest.fn();
  act(() => {
    render(
      <Provider store={store}>
        <UpgradeBuilding building={props.building} />
      </Provider>, container,
    );
  });

  expect(container.querySelector('.upgrade-details>p').textContent).toEqual('Upgrade to level 3');
  expect(container.querySelector('.upgrade-details p:nth-child(2)').textContent).toEqual('100 1:00');
});
