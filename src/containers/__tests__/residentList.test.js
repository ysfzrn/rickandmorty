import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import {MockedProvider} from 'react-apollo/test-utils';
import ResidentList from '../locationDetail/residentList';
import {residentQuery} from '../locationDetail/residentList';
import wait from 'waait';
import {DetailCard} from '../../components';
import {shallow} from 'enzyme';
import {TouchableOpacity} from 'react-native';

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
        name: 'Earth (C-137)'
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
      <ResidentList />
    </MockedProvider>
  );

  await wait(0);

  const FlatListComponent = rendered.toJSON();

  //Query componenti data ile birlikte doğru sonuç üretiyor mu ?
  console.log('FlatListComponent.props', FlatListComponent);
  const element = FlatListComponent.props.data[0];
  expect(element.name).toBe('Beth Smith');
  expect(element.id).toBe('38');

  //FlatList componentin ilk elemanı alınca başarılı şekilde render ediliyor mu ?
  const detailCard = renderer.create(<DetailCard element={element} />);
  expect(detailCard).toBeTruthy();
});

it('ResidentList renders with error / no data found', async () => {
  const mocks = {
    request: {
      query: residentQuery,
      variables: {
        page: 1
      }
    },
    error: new Error('upps')
  };

  const NoDataFoundComponent = renderer.create(
    <MockedProvider mocks={[mocks]} addTypename={false}>
      <ResidentList />
    </MockedProvider>
  );

  await wait(0);
  jest.useFakeTimers();
  //ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.
  //Bu hatayı gideremedim ama test success alıyor

  expect(NoDataFoundComponent.toJSON().children[0].props.source.testUri).toBe(
    '../../../src/assets/nodatafound.png'
  );
});
