import React from 'react';
import renderer from 'react-test-renderer';

import Loading from '../loading';

it('Loading component renders successfully', () => {
  const rendered = renderer.create(<Loading />).toJSON();
  expect(rendered).toBeTruthy();
});
