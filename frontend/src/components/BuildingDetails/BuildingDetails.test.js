import React from 'react';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import BuildingDetails from './BuildingDetails';

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
    match: {
      params: {
        id: '1',
      },
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
    buildings: {
      buildings: [{
        type: 'farm',
        id: 1,
        hp: 200,
        level: 2,
        startedAt: '2020-11-02T14:25:05.000Z',
        finishedAt: '2020-11-02T14:26:05.000Z',
      }],
    },
  });
  store.dispatch = jest.fn();
  act(() => {
    render(
      <Provider store={store}>
        <BuildingDetails match={props.match} />
      </Provider>, container,
    );
  });

  expect(container.querySelector('.building-description > p').textContent).toEqual('You can produce food on your Farm. The higher level your Farm is the more food it will produce.');
  expect(container.querySelector('.image-div >h2').textContent).toEqual('FarmLevel 2');
});

it('displays errormessage if found in state', () => {
  const props = {
    match: {
      params: {
        id: '1',
      },
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
      upgradeError: 'error message',
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
    buildings: {
      buildings: [{
        type: 'farm',
        id: 1,
        hp: 200,
        level: 2,
        startedAt: '2020-11-02T14:25:05.000Z',
        finishedAt: '2020-11-02T14:26:05.000Z',
      }],
    },
  });
  store.dispatch = jest.fn();
  act(() => {
    render(
      <Provider store={store}>
        <BuildingDetails match={props.match} />
      </Provider>, container,
    );
  });

  expect(container.querySelector('.building-description > p').textContent).toEqual('You can produce food on your Farm. The higher level your Farm is the more food it will produce.');
  expect(container.querySelector('.image-div >h2').textContent).toEqual('FarmLevel 2');
  expect(container.querySelector('.upgrade-error-message-container span').textContent).toEqual('error message');
});
