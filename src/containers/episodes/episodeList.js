import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {ListCard, Loading, NoDataFound} from '../../components';

const episodeQuery = gql`
  query episodes( $page: Int) {
    episodes(page: $page) {
      info{
        count
        pages
        next
        prev
      }
      results{
        id
        name
        air_date
        episode
      }
    }
  }
`;

class EpisodeList extends React.PureComponent {
  handleEpisodeUpdateQuery = (previousResult, fetchMoreResult, data) => {
    if (!fetchMoreResult || !data.episodes || data.episodes.info.next === null) {
      return previousResult;
    }
    const newList = {
      episodes: {
        ...fetchMoreResult.episodes,
        info: fetchMoreResult.episodes.info,
        results: [
          ...previousResult.episodes.results,
          ...fetchMoreResult.episodes.results.filter(
            n => !previousResult.episodes.results.some(p => p.id === n.id)
          )
        ]
      }
    };
    return newList;
  };

  render() {
    const {cardPress} = this.props;
    return (
      <Query
        query={episodeQuery}
        variables={{
          page: 1
        }}
      >
        {({data, error, fetchMore, refetch, loading}) => {
          console.log('data', data);
          console.log('loading', loading);
          console.log('error', error);
          if (!loading && data && !error) {
            if (data.episodes.results) {
              return (
                <FlatList
                  refreshing={loading}
                  onRefresh={() => refetch()}
                  keyExtractor={item => {
                    return item.id;
                  }}
                  data={data.episodes.results}
                  renderItem={({item}) => (
                    <ListCard
                      secondary
                      item={item}
                      name={item.name}
                      text={item.air_date}
                      cardPress={cardPress}
                    />
                  )}
                  showsVerticalScrollIndicator={false}
                  onEndReachedThreshold={0.5}
                  ListFooterComponent={() => {
                    return data.episodes.info.next !== null && <Loading />;
                  }}
                  onEndReached={() => {
                    fetchMore({
                      variables: {page: data.episodes.info.next},
                      updateQuery: (previousResult, {fetchMoreResult}) =>
                        this.handleEpisodeUpdateQuery(previousResult, fetchMoreResult, data)
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

export default EpisodeList;
