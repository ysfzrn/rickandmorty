import React from 'react';
import renderer from 'react-test-renderer';
import {MockedProvider} from 'react-apollo/test-utils';
import Locations from '../locations/index';
import {locationQuery} from '../locations/locationList';

const navigation = {navigate: jest.fn()};

const mocks = [];

it('Locations container renders successfully', () => {
  const rendered = renderer
    .create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Locations navigation={navigation} />
      </MockedProvider>
    )
    .toJSON();
  expect(rendered).toBeTruthy();
});
