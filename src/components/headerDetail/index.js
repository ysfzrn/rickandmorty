//import liraries
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import theme from '../../utils/theme';
const {width} = Dimensions.get('screen');

const HeaderDetail = ({secondary}) => {
  const themeContainer = {
    backgroundColor: secondary ? theme.color.secondary : theme.color.primary
  };
  return <View style={[styles.container, themeContainer]} />;
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width,
    height: theme.elements.headerHeight,
    paddingHorizontal: theme.space.medium,
    justifyContent: 'center'
  }
});

//make this component available to the app
export default HeaderDetail;
