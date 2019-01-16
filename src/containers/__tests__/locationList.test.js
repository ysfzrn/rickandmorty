import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import {MockedProvider} from 'react-apollo/test-utils';
import LocationList from '../locations/locationList';
import {locationQuery} from '../locations/locationList';
import wait from 'waait';

it('LocationList renders with loading', async () => {
  const mocks = [];

  const rendered = renderer
    .create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LocationList />
      </MockedProvider>
    )
    .toJSON();

  expect(rendered.children[0].type).toContain('ActivityIndicator');
});

it('LocationList renders with data', async () => {
  const mocks = {
    request: {
      query: locationQuery,
      variables: {
        page: 1
      }
    },
    result: {
      data: {
        locations: {
          info: {
            prev: null,
            next: 2,
            count: 1,
            pages: 1
          },
          results: [
            {
              id: '1',
              name: 'Earth (C-137)',
              dimension: 'Dimension C-137',
              type: 'Planet'
            }
          ]
        }
      }
    }
  };

  await wait(3000);
  jest.useFakeTimers();

  const rendered = renderer
    .create(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <LocationList />
      </MockedProvider>
    )
    .toJSON();

  expect(rendered.children[0].type).toContain('FlatList');
});
