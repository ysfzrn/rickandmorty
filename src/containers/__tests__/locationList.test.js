import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import {MockedProvider} from 'react-apollo/test-utils';
import LocationList from '../locations/locationList';
import Locations from '../locations';
import wait from 'waait';
import {ListCard} from '../../components';
import {shallow} from 'enzyme';
import {TouchableOpacity} from 'react-native';
import {locationQuery} from '../locations/queries';

const navigation = {navigate: jest.fn()};

it('Locations container renders successfully', () => {
  const rendered = renderer
    .create(
      <MockedProvider mocks={[]} addTypename={false}>
        <Locations navigation={navigation} />
      </MockedProvider>
    )
    .toJSON();

  expect(rendered).toBeTruthy();
});

it('LocationList renders with loading', async () => {
  const rendered = renderer
    .create(
      <MockedProvider mocks={[]} addTypename={false}>
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
    <ListCard item={element} name={element.name} text={element.dimension} cardPress={callback} />
  );

  expect(wrapper.find(TouchableOpacity).length).toBe(1);
  wrapper.find(TouchableOpacity).first().props().onPress(item => console.log('item', item));
  expect(callback).toHaveBeenCalled();
});
