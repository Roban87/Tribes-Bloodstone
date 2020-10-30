import React from 'react';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import ResourcesContainer from './ResourcesContainer';

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

it('Componenet loaded with data', () => {
  const store = mockStore({
    resources: {
      foodAmount: 200,
      foodGeneration: 5,
      goldAmount: 500,
      goldGeneration: 10,
      errorMessage: '',
      getResources: jest.fn(),
    },
  });

  store.dispatch = jest.fn();

  act(() => {
    render(
      <Provider store={store}>
        <ResourcesContainer />
      </Provider>, container,
    );
  });

  expect(container.textContent).toBe('2005 / minute50010 / minute');
  expect(store.dispatch).toHaveBeenCalled();
});

it('compoenent laded with error message', () => {
  const store = mockStore({
    resources: {
      foodAmount: 0,
      foodGeneration: 0,
      goldAmount: 0,
      goldGeneration: 0,
      errorMessage: 'Can\'t load resources. Please refresh the page!',
      getResources: jest.fn(),
    },
  });

  store.dispatch = jest.fn();

  act(() => {
    render(
      <Provider store={store}>
        <ResourcesContainer />
      </Provider>, container,
    );
  });

  expect(container.textContent).toBe('Can\'t load resources. Please refresh the page!');
  expect(store.dispatch).toHaveBeenCalled();
});
