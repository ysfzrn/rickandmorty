import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {ListCard, Loading, DetailCard} from '../../components';
// locations(page: $page, filter:{dimension:$dimension })
const residentQuery = gql`
  query locations( $page: Int, $planet: String ) {
    locations(page: $page, filter:{name:$planet }) {
      info {
        prev
        next
        count
        pages
      }
      results {
        dimension
        residents{
          id
          name
          status
          species
          gender
          type
          image
          location{
            name
            dimension
          }
        }
      }
    }
  }
`;

const ResidentList = ({planet}) => {
  return (
    <Query
      query={residentQuery}
      variables={{
        page: 1,
        planet: planet
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
                data={data.locations.results[0].residents}
                renderItem={({item}) => <DetailCard item={item} />}
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

export default ResidentList;
