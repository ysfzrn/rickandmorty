//import liraries
import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import theme from '../../utils/theme';

const NoDataFoundImage = require('../../assets/nodatafound.png');

const NoDataFound = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={NoDataFoundImage} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...theme.utils.flexRowCenter
  },
  image: {
    width: 320,
    height: 202,
    borderRadius: 10
  }
});

//make this component available to the app
export default NoDataFound;
