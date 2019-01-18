//import liraries
import React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import theme from '../../utils/theme';
const {width} = Dimensions.get('screen');

const Logo = require('../../assets/logo.png');

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image source={Logo} style={styles.logo} />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width,
    height: theme.elements.headerHeight,
    paddingHorizontal: theme.space.medium
  },
  logoWrapper: {
    height: '100%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: theme.color.borderColor
  },
  logo: {
    width: 183,
    height: 59
  }
});

//make this component available to the app
export default Header;
