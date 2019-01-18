import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import {MockedProvider} from 'react-apollo/test-utils';
import Episodes from '../episodes';
import EpisodeList from '../episodes/episodeList';
import wait from 'waait';
import {ListCard} from '../../components';
import {shallow} from 'enzyme';
import {TouchableOpacity} from 'react-native';
import {episodeQuery} from '../episodes/queries';

const navigation = {navigate: jest.fn()};

it('Episodes container renders successfully', () => {
  const rendered = renderer
    .create(
      <MockedProvider mocks={[]} addTypename={false}>
        <Episodes navigation={navigation} />
      </MockedProvider>
    )
    .toJSON();

  expect(rendered).toBeTruthy();
});

it('EpisodeList renders with loading', async () => {
  const rendered = renderer
    .create(
      <MockedProvider mocks={[]} addTypename={false}>
        <EpisodeList />
      </MockedProvider>
    )
    .toJSON();

  expect(rendered.children[0].type).toContain('ActivityIndicator');
});

it('EpisodeList renders with data', async () => {
  const mocks = {
    request: {
      query: episodeQuery,
      variables: {
        page: 1
      }
    },
    result: {
      data: {
        episodes: {
          info: {
            prev: null,
            next: 2,
            count: 1,
            pages: 1
          },
          results: [
            {
              id: '1',
              name: 'Pilot',
              air_date: 'December 2, 2013',
              episode: 'S01E01'
            }
          ]
        }
      }
    }
  };

  const rendered = renderer.create(
    <MockedProvider mocks={[mocks]} addTypename={false}>
      <EpisodeList />
    </MockedProvider>
  );

  await wait(0);

  const FlatListComponent = rendered.toJSON();

  //Query componenti data ile birlikte doğru sonuç üretiyor mu ?
  const element = FlatListComponent.props.data[0];
  expect(element.name).toBe('Pilot');
  expect(element.id).toBe('1');

  //FlatList componentin ilk elemanı alınca başarılı şekilde render ediliyor mu ?
  const listCard = renderer.create(
    <ListCard item={element} name={element.name} text={element.dimension} cardPress={() => {}} />
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
