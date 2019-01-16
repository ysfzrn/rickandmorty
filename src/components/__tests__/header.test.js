import React from 'react';
import renderer from 'react-test-renderer';

import Header from '../header';

it('Header component renders successfully', () => {
  const rendered = renderer.create(<Header />).toJSON();
  expect(rendered).toBeTruthy();
});
