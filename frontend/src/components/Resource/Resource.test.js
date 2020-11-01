import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Resource from './Resource';

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

it('renders with  data', () => {
  const props = {
    generation: 5,
    building: 'farm',
    altBuilding: 'farm',
    amount: 200,
    resource: 'bread',
    altResource: 'bread',
  };

  act(() => {
    render(<Resource
      building={props.building}
      altBuilding={props.altBuilding}
      amount={props.amount}
      resource={props.resource}
      altResource={props.altResource}
      generation={props.generation}
    />, container);
  });
  expect(container.textContent).toBe('2005 / minute');
});
