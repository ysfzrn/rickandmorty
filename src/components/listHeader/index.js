//import liraries
import React from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet} from 'react-native';
import theme from '../../utils/theme';

// create a component
const ListHeader = ({title}) => {
  return <Text style={styles.title}>{title}</Text>;
};

// define your styles
const styles = StyleSheet.create({
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#434343',
    paddingLeft: theme.space.medium,
    paddingTop: theme.space.medium
  }
});

ListHeader.propTypes = {
  title: PropTypes.string
};

//make this component available to the app
export default ListHeader;
