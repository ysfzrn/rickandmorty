import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Loading, DetailCard} from '../../components';

const episodeQuery = gql`
  query episodes( $page: Int, $episode: String ) {
    episodes(page: $page, filter:{episode:$episode }) {
      info {
        prev
        next
        count
        pages
      }
      results{
        id
        name
        air_date
        characters{
          id
          name
          status
          species
          gender
          type
          image
          location{
            name
          }
        }
      }
    }
  }
`;

const CharacterList = ({episode}) => {
  console.log('episode', episode);
  return (
    <Query
      query={episodeQuery}
      variables={{
        page: 1,
        episode: episode
      }}
    >
      {({data, error, fetchMore, refetch, loading, ...others}) => {
        console.log('error', error);
        console.log('data', data);
        console.log('others', others);
        if (!loading && data && !error) {
          if (data.episodes.results) {
            return (
              <FlatList
                refreshing={loading}
                onRefresh={() => refetch()}
                keyExtractor={item => {
                  return item.id;
                }}
                data={data.episodes.results[0].characters}
                renderItem={({item}) => <DetailCard secondary item={item} />}
                showsVerticalScrollIndicator={false}
              />
            );
          } else {
            return <View><Text>No data found</Text></View>;
          }
        } else {
          return <Loading />;
        }
      }}
    </Query>
  );
};

export default CharacterList;
