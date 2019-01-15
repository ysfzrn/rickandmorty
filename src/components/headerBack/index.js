//import liraries
import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
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

// define your styles
const styles = StyleSheet.create({
  container: {
    height: theme.elements.headerHeight,
    justifyContent: 'center'
  },
  back: {
    width: 23,
    height: 16
  }
});

//make this component available to the app
export default HeaderBack;
