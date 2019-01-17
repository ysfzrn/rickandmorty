import React from 'react';
import {FlatList} from 'react-native';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {ListCard, Loading, NoDataFound} from '../../components';

export const locationQuery = gql`
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

class LocationList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  handleUpdateLocationQuery = (previousResult, fetchMoreResult, data) => {
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

  renderItem = ({item}) => {
    const {cardPress} = this.props;
    return <ListCard item={item} name={item.name} text={item.dimension} cardPress={cardPress} />;
  };

  render() {
    return (
      <Query
        query={locationQuery}
        variables={{
          page: 1
        }}
      >
        {({data, error, fetchMore, refetch, loading}) => {
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
                  renderItem={this.renderItem}
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
              return <NoDataFound />;
            }
          } else if (error) {
            return <NoDataFound />;
          } else {
            return <Loading />;
          }
        }}
      </Query>
    );
  }
}

export default LocationList;
