import React from 'react';
import {FlatList} from 'react-native';
import {Query} from 'react-apollo';
import {ListCard, Loading, NoDataFound} from '../../components';
import {episodeQuery} from './queries';

class EpisodeList extends React.PureComponent {
  constructor(props) {
    super(props);
  }
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
          if (loading) {
            return <Loading />;
          } else if (error) {
            return null;
          } else {
            if (data.episodes.results) {
              return (
                <FlatList
                  refreshing={loading}
                  onRefresh={() => refetch()}
                  keyExtractor={item => {
                    return item.id;
                  }}
                  data={data.episodes.results || []}
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
          }
        }}
      </Query>
    );
  }
}

export default EpisodeList;
