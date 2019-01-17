//import liraries
import React, {Component} from 'react';
import {View, Platform, StyleSheet} from 'react-native';
import {HeaderDetail, HeaderBack, DetailPageTitle} from '../../components';
import theme from '../../utils/theme';
import ResidentList from './residentList';

// create a component
class LocationDetail extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <HeaderDetail />,
      headerLeft: <HeaderBack backPress={() => navigation.goBack()} />,
      headerStyle: {
        backgroundColor: theme.color.primary,
        height: theme.elements.headerHeight,
        marginHorizontal: Platform.OS === 'android' ? 0 : theme.space.medium
      }
    };
  };
  render() {
    const {navigation} = this.props;
    const location = navigation.state.params.location;
    return (
      <View style={styles.container}>
        <DetailPageTitle
          mainTitle={location.name}
          subtitle={location.type}
          subtitleTwo={location.dimension}
        />
        <ResidentList planet={location.name} />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background
  }
});

//make this component available to the app
export default LocationDetail;
