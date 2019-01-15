import React from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation';
import {MyTab} from './components';
import Locations from './containers/locations';
import LocationDetail from './containers/locationDetail';
import Episodes from './containers/episodes';
import EpisodeDetail from './containers/episodeDetail';

const LocationStack = createStackNavigator({
  LocationList: Locations,
  LocationDetail: LocationDetail
});

const EpisodeStack = createStackNavigator({
  EpisodeList: Episodes,
  EpisodeDetail: EpisodeDetail
});

const MyTabStack = createBottomTabNavigator(
  {
    Locations: LocationStack,
    Episodes: EpisodeStack
  },
  {
    tabBarComponent: props => <MyTab {...props} />,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: false
  }
);

const AppNavigator = createSwitchNavigator(
  {
    App: MyTabStack
  },
  {
    initialRouteName: 'App'
  }
);

export default createAppContainer(AppNavigator);
