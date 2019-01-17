//import liraries
import React, {Component} from 'react';
import {View, Platform, StyleSheet} from 'react-native';
import {HeaderDetail, HeaderBack, DetailPageTitle} from '../../components';
import theme from '../../utils/theme';
import CharacterList from './characterList';

// create a component
class EpisodeDetail extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <HeaderDetail secondary />,
      headerLeft: <HeaderBack secondary backPress={() => navigation.goBack()} />,
      headerStyle: {
        backgroundColor: theme.color.secondary,
        height: theme.elements.headerHeight,
        marginHorizontal: Platform.OS === 'android' ? 0 : theme.space.medium
      }
    };
  };
  render() {
    const {navigation} = this.props;
    const episode = navigation.state.params.episode;
    return (
      <View style={styles.container}>
        <DetailPageTitle
          secondary
          mainTitle={episode.name}
          subtitle={episode.episode}
          subtitleTwo={episode.air_date}
        />
        <CharacterList episode={episode.episode} />
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
export default EpisodeDetail;
