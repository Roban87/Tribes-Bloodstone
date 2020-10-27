import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import AddBuildingButton from './AddBuildingButton';

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

it('render with correct data', () => {
  const onClickMock = jest.fn();
  act(() => {
    render(<AddBuildingButton type="farm" onClick={onClickMock} />, container);
  });
  expect(container.textContent).toBe('Add farm');
});
