import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import {MockedProvider} from 'react-apollo/test-utils';
import EpisodeDetail from '../episodeDetail';
import CharacterList from '../episodeDetail/characterList';
import wait from 'waait';
import {DetailCard} from '../../components';
import {episodeDetailQuery} from '../episodeDetail/queries';

it('EpisodeDetail container renders successfully', () => {
  const navigation = {navigate: jest.fn(), state: {params: {episode: {episode: 'S01E01'}}}};

  const rendered = renderer
    .create(
      <MockedProvider mocks={[]} addTypename={false}>
        <EpisodeDetail navigation={navigation} />
      </MockedProvider>
    )
    .toJSON();

  expect(rendered).toBeTruthy();
});

it('CharacterList renders with loading', async () => {
  const mocks = [];

  const rendered = renderer
    .create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterList />
      </MockedProvider>
    )
    .toJSON();

  expect(rendered.children[0].type).toContain('ActivityIndicator');
});

it('CharacterList renders with data', async () => {
  const mocks = {
    request: {
      query: episodeDetailQuery,
      variables: {
        page: 1,
        episode: 'S01E01'
      }
    },
    result: {
      data: {
        episodes: {
          info: {
            prev: null,
            next: null,
            count: 1,
            pages: 1
          },
          results: [
            {
              id: '1',
              name: 'Pilot',
              air_date: 'December 2, 2013',
              characters: [
                {
                  id: '1',
                  name: 'Rick Sanchez',
                  status: 'Alive',
                  species: 'Human',
                  gender: 'Male',
                  type: '',
                  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                  location: {
                    name: 'Earth (Replacement Dimension)'
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
      <CharacterList episode="S01E01" />
    </MockedProvider>
  );

  await wait(0);

  const FlatListComponent = rendered.toJSON();

  //Query componenti data ile birlikte doğru sonuç üretiyor mu ?
  const element = FlatListComponent.props.data[0];
  expect(element.name).toBe('Rick Sanchez');
  expect(element.id).toBe('1');

  //FlatList componentin ilk elemanı alınca başarılı şekilde render ediliyor mu ?
  const detailCard = renderer.create(<DetailCard secondary item={element} />);
  expect(detailCard).toBeTruthy();
});
