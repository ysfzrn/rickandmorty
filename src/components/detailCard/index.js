//import liraries
import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import theme from '../../utils/theme';

// create a component
const DetailCard = ({item, secondary}) => {
  const themeContainer = {
    backgroundColor: secondary ? theme.color.episodeCardColor : theme.color.residentCardColor
  };

  return (
    <View style={[styles.container, themeContainer]}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.image}} style={{width: 51, height: 51, borderRadius: 10}} />
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.cardTitle}>{item.name}</Text>

        <View style={styles.detailTextContainer}>
          <Text style={styles.detailTextLabel}>Status</Text>
          <Text style={styles.detailText}>{item.status}</Text>
        </View>

        <View style={styles.detailTextContainer}>
          <Text style={styles.detailTextLabel}>Gender</Text>
          <Text style={styles.detailText}>{item.gender}</Text>
        </View>

        <View style={styles.detailTextContainer}>
          <Text style={styles.detailTextLabel}>Location Name</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.detailText}>
            {item.location.name}
          </Text>
        </View>
      </View>
    </View>
  );
};

DetailCard.propTypes = {
  secondary: PropTypes.bool,
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    species: PropTypes.string,
    gender: PropTypes.string,
    type: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.shape({
      name: PropTypes.string,
      dimension: PropTypes.string
    })
  })
};

DetailCard.defaultProps = {
  secondary: false
};

//make this component available to the app
export default DetailCard;
