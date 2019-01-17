import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import {MockedProvider} from 'react-apollo/test-utils';
import LocationList from '../locations/locationList';
import {locationQuery} from '../locations/locationList';
import wait from 'waait';
import {ListCard} from '../../components';
import {shallow} from 'enzyme';
import {TouchableOpacity} from 'react-native';

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

  const rendered = renderer.create(
    <MockedProvider mocks={[mocks]} addTypename={false}>
      <LocationList />
    </MockedProvider>
  );

  await wait(0);

  const FlatListComponent = rendered.toJSON();

  //Query componenti data ile birlikte doğru sonuç üretiyor mu ?
  const element = FlatListComponent.props.data[0];
  expect(element.name).toBe('Earth (C-137)');
  expect(element.id).toBe('1');

  //FlatList componentin ilk elemanı alınca başarılı şekilde render ediliyor mu ?
  const listCard = renderer.create(
    <ListCard element={element} name={element.name} text={element.dimension} cardPress={() => {}} />
  );
  expect(listCard).toBeTruthy();

  //listelenen elementlere basınca, tetikleniyorlar mı
  //user interaction testi için enzyme kullanıyoruz.
  const callback = jest.fn();
  const wrapper = shallow(
    <ListCard element={element} name={element.name} text={element.dimension} cardPress={callback} />
  );

  expect(wrapper.find(TouchableOpacity).length).toBe(1);
  wrapper.find(TouchableOpacity).first().props().onPress(item => console.log('item', item));
  expect(callback).toHaveBeenCalled();
});

it('LocationList renders with error / no data found', async () => {
  const mocks = {
    request: {
      query: locationQuery,
      variables: {
        page: 1
      }
    },
    error: new Error('upps')
  };

  const NoDataFoundComponent = renderer.create(
    <MockedProvider mocks={[mocks]} addTypename={false}>
      <LocationList />
    </MockedProvider>
  );

  await wait(0);
  jest.useFakeTimers();
  //ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.
  //Bu hatayı gideremedim ama test success alıyor

  console.log('rendered error', NoDataFoundComponent.toJSON().children[0].props.source.testUri);
  expect(NoDataFoundComponent.toJSON().children[0].props.source.testUri).toBe(
    '../../../src/assets/nodatafound.png'
  );
});
