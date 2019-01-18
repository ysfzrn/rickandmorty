//import liraries
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Image, TouchableOpacity, Platform} from 'react-native';
import theme from '../../utils/theme';

const Back = require('../../assets/back.png');
const BackBlack = require('../../assets/backBlack.png');

const HeaderBack = ({backPress, secondary}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={backPress}>
      <Image style={styles.back} source={secondary ? BackBlack : Back} />
    </TouchableOpacity>
  );
};

HeaderBack.propTypes = {
  backPress: PropTypes.func.isRequired,
  secondary: PropTypes.bool
};

HeaderBack.defaultProps = {
  secondary: false
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: theme.elements.headerHeight,
    justifyContent: 'center',
    marginHorizontal: Platform.OS === 'android' ? theme.space.medium : 0
  },
  back: {
    width: 23,
    height: 16
  }
});

//make this component available to the app
export default HeaderBack;
