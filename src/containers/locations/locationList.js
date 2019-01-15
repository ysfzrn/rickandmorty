import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {ListCard, Loading} from '../../components';

const locationQuery = gql`
  query locations( $page: Int) {
    locations(page: $page) {
      info {
        prev
        next
        count
        pages
      }
      results {
        id
        name
        dimension
        type
      }
    }
  }
`;

const LocationList = ({cardPress}) => {
  handleUpdateLocationQuery = (previousResult, fetchMoreResult, data) => {
    console.log('LocationList onEndReached');
    if (!fetchMoreResult || data.locations.info.next === null || !data.locations) {
      return previousResult;
    }
    const newList = {
      locations: {
        ...fetchMoreResult.locations,
        info: fetchMoreResult.locations.info,
        results: [
          ...previousResult.locations.results,
          ...fetchMoreResult.locations.results.filter(
            n => !previousResult.locations.results.some(p => p.id === n.id)
          )
        ]
      }
    };
    return newList;
  };

  return (
    <Query
      query={locationQuery}
      variables={{
        page: 1
      }}
    >
      {({data, error, fetchMore, refetch, loading, ...others}) => {
        console.log('error', error);
        console.log('data', data);
        console.log('others', others);
        if (!loading && data && !error) {
          if (data.locations.results) {
            return (
              <FlatList
                refreshing={loading}
                onRefresh={() => refetch()}
                keyExtractor={item => {
                  return item.id;
                }}
                data={data.locations.results}
                renderItem={({item}) => (
                  <ListCard
                    item={item}
                    name={item.name}
                    text={item.dimension}
                    cardPress={cardPress}
                  />
                )}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => {
                  return data.locations.info.next !== null && <Loading />;
                }}
                onEndReached={() => {
                  fetchMore({
                    variables: {page: data.locations.info.next},
                    updateQuery: (previousResult, {fetchMoreResult}) =>
                      this.handleUpdateLocationQuery(previousResult, fetchMoreResult, data)
                  });
                }}
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

export default LocationList;