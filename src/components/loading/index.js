//import liraries
import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import theme from '../../utils/theme';

// create a component
const Loading = ({size}) => {
  return (
    <View style={{marginTop: theme.space.medium * 2, marginBottom: theme.space.medium * 2}}>
      <ActivityIndicator size={size} />
    </View>
  );
};

Loading.defaultProps = {
  size: 'large'
};

//make this component available to the app
export default Loading;
