//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Header} from '../../components';
import theme from '../../utils/theme';
import LocationList from './locationList';

// create a component
class Locations extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <Header />,
      headerStyle: {
        backgroundColor: theme.color.background,
        height: theme.elements.headerHeight,
        marginHorizontal: theme.space.medium
      }
    };
  };

  handleCardPress = item => {
    const {navigation} = this.props;
    navigation.navigate('LocationDetail', {location: item});
  };

  render() {
    return (
      <View style={styles.container}>
        <LocationList cardPress={this.handleCardPress} />
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

export default Locations;
