import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import {MockedProvider} from 'react-apollo/test-utils';
import LocationDetail from '../locationDetail';
import ResidentList from '../locationDetail/residentList';
import wait from 'waait';
import {DetailCard} from '../../components';
import {residentQuery} from '../locationDetail/queries';

it('LocationDetail container renders successfully', () => {
  const navigation = {navigate: jest.fn(), state: {params: {location: 'Earth (C-137)'}}};

  const rendered = renderer
    .create(
      <MockedProvider mocks={[]} addTypename={false}>
        <LocationDetail navigation={navigation} />
      </MockedProvider>
    )
    .toJSON();

  expect(rendered).toBeTruthy();
});

it('residentList renders with loading', async () => {
  const mocks = [];

  const rendered = renderer
    .create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ResidentList />
      </MockedProvider>
    )
    .toJSON();

  expect(rendered.children[0].type).toContain('ActivityIndicator');
});

it('ResidentList renders with data', async () => {
  const mocks = {
    request: {
      query: residentQuery,
      variables: {
        page: 1,
        planet: 'Earth (C-137)'
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
              dimension: 'Dimension C-137',
              residents: [
                {
                  id: '38',
                  name: 'Beth Smith',
                  status: 'Alive',
                  species: 'Human',
                  gender: 'Female',
                  type: '',
                  image: 'https://rickandmortyapi.com/api/character/avatar/38.jpeg',
                  location: {
                    name: 'Earth (C-137)',
                    dimension: 'Dimension C-137'
                  }
                }
              ]
            }
          ]
        }
      }
    }
  };

  const rendered = renderer.create(
    <MockedProvider mocks={[mocks]} addTypename={false}>
      <ResidentList planet="Earth (C-137)" />
    </MockedProvider>
  );

  await wait(0);

  const FlatListComponent = rendered.toJSON();

  //Query componenti data ile birlikte doğru sonuç üretiyor mu ?
  const element = FlatListComponent.props.data[0];
  expect(element.name).toBe('Beth Smith');
  expect(element.id).toBe('38');

  //FlatList componentin ilk elemanı alınca başarılı şekilde render ediliyor mu ?
  const detailCard = renderer.create(<DetailCard item={element} />);
  expect(detailCard).toBeTruthy();
});
