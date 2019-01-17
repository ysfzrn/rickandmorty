import React from 'react';
import renderer from 'react-test-renderer';
import {MockedProvider} from 'react-apollo/test-utils';
import LocationDetail from '../locationDetail';

const navigation = {navigate: jest.fn(), state: {params: {location: 'Earth (C-137)'}}};

const mocks = [];

it('LocationDetail container renders successfully', () => {
  const rendered = renderer
    .create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LocationDetail navigation={navigation} />
      </MockedProvider>
    )
    .toJSON();

  expect(rendered).toBeTruthy();
});
