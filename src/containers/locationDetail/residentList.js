import React from 'react';
import PropTypes from 'prop-types';
import {FlatList, Text} from 'react-native';
import {Query} from 'react-apollo';
import {Loading, DetailCard, ListHeader} from '../../components';
import {residentQuery} from './queries';

const ResidentList = ({planet}) => {
  return (
    <Query
      query={residentQuery}
      variables={{
        page: 1,
        planet: planet
      }}
    >
      {({data, error, refetch, loading}) => {
        if (loading) {
          return <Loading />;
        } else if (error) {
          return null;
        } else {
          return (
            <FlatList
              refreshing={loading}
              onRefresh={() => refetch()}
              ListHeaderComponent={() => <ListHeader title="Residents" />}
              keyExtractor={item => {
                return item.id;
              }}
              data={data.locations.results[0].residents || []}
              renderItem={({item}) => <DetailCard item={item} />}
              showsVerticalScrollIndicator={false}
            />
          );
        }
      }}
    </Query>
  );
};

ResidentList.propTypes = {
  planet: PropTypes.string
};

export default ResidentList;
