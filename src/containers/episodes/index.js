//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Header} from '../../components';
import theme from '../../utils/theme';
import EpisodeList from './episodeList';

// create a component
class Episodes extends Component {
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
    navigation.navigate('EpisodeDetail', {episode: item});
  };

  render() {
    return (
      <View style={styles.container}>
        <EpisodeList cardPress={this.handleCardPress} />
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
export default Episodes;
