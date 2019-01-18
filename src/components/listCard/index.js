//import liraries
import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import theme from '../../utils/theme';

const Arrow = require('../../assets/arrow.png');
const ArrowBlack = require('../../assets/arrowBlack.png');

// create a component
const LocationCard = ({item, name, text, secondary, cardPress}) => {
  const themeContainer = {
    backgroundColor: secondary ? theme.color.secondary : theme.color.primary
  };

  const themeName = {
    color: secondary ? theme.color.secondaryLight : theme.color.primaryLight
  };

  const themeText = {
    color: secondary ? '#878787' : theme.color.primaryLight
  };

  return (
    <TouchableOpacity style={[styles.container, themeContainer]} onPress={() => cardPress(item)}>
      <View style={styles.arrowWrapper}>
        <Image source={secondary ? ArrowBlack : Arrow} style={styles.arrow} />
      </View>
      <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.cardTitle, themeName]}>
        {name}
      </Text>
      <Text style={[styles.cardText, themeText]}>{text}</Text>
    </TouchableOpacity>
  );
};

LocationCard.propTypes = {
  item: PropTypes.object,
  name: PropTypes.string,
  text: PropTypes.string,
  secondary: PropTypes.bool,
  cardPress: PropTypes.func
};

LocationCard.defaultProps = {
  cardPress: () => {},
  secondary: false
};

export default LocationCard;
