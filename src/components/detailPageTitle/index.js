//import liraries
import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../../utils/theme';

// create a component
const DetailPageTitle = ({mainTitle, subtitle, subtitleTwo, secondary}) => {
  const themeTitle = {
    color: secondary ? theme.color.secondaryLight : theme.color.primaryLight
  };

  const themeContainer = {
    backgroundColor: secondary ? theme.color.secondary : theme.color.primary
  };

  const themeSubtitle = {
    color: secondary ? '#878787' : theme.color.primaryLight
  };

  return (
    <View style={[styles.titleContainer, themeContainer]}>
      <Text style={[styles.title, themeTitle]} numberOfLines={1} ellipsizeMode="tail">
        {mainTitle}
      </Text>
      <Text style={[styles.subtitle, themeSubtitle]}>{subtitle}</Text>
      <Text style={[styles.subtitle, themeSubtitle]}>{subtitleTwo}</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  title: {
    fontSize: theme.text.title,
    color: theme.color.primaryLight,
    fontWeight: 'bold'
  },
  titleContainer: {
    backgroundColor: theme.color.primary,
    height: theme.elements.detalPageHederHeight,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: theme.space.medium
  },
  subtitle: {
    marginTop: theme.space.tiny,
    fontSize: theme.text.small,
    color: theme.color.primaryLight
  }
});

DetailPageTitle.propTypes = {
  secondary: PropTypes.bool,
  mainTitle: PropTypes.string,
  subtitle: PropTypes.string,
  subtitleTwo: PropTypes.string
};

//make this component available to the app
export default DetailPageTitle;
