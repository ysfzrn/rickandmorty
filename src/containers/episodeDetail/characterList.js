import React from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import {Query} from 'react-apollo';
import {Loading, DetailCard, NoDataFound, ListHeader} from '../../components';
import {episodeDetailQuery} from './queries';

const CharacterList = ({episode}) => {
  return (
    <Query
      query={episodeDetailQuery}
      variables={{
        page: 1,
        episode: episode
      }}
    >
      {({data, error, fetchMore, refetch, loading}) => {
        if (!loading && data && !error) {
          if (data.episodes.results) {
            return (
              <FlatList
                refreshing={loading}
                onRefresh={() => refetch()}
                ListHeaderComponent={() => <ListHeader title="Characters" />}
                keyExtractor={item => {
                  return item.id;
                }}
                data={data.episodes.results[0].characters}
                renderItem={({item}) => <DetailCard secondary item={item} />}
                showsVerticalScrollIndicator={false}
              />
            );
          }
        } else if (error) {
          return <NoDataFound />;
        } else {
          return <Loading />;
        }
      }}
    </Query>
  );
};

CharacterList.propTypes = {
  episode: PropTypes.string
};

export default CharacterList;
