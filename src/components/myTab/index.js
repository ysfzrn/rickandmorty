//import liraries
import React, {PureComponent} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import MyStyle from '../../utils/theme';

const LocationActive = require('../../assets/location-active.png');
const LocationPassive = require('../../assets/location-passive.png');

const EpisodeActive = require('../../assets/episode-active.png');
const EpisodePassive = require('../../assets/episode-passive.png');

const buttons = [
  {
    id: 0,
    label: 'Locations',
    url: 'Locations',
    iconWidth: 17,
    iconHeight: 30,
    iconActive: LocationActive,
    iconPassive: LocationPassive
  },
  {
    id: 1,
    label: 'Episodes',
    url: 'Episodes',
    iconWidth: 30,
    iconHeight: 25,
    iconActive: EpisodeActive,
    iconPassive: EpisodePassive
  }
];

// create a component
class MyTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  handleRoutePress = (index, route) => {
    this.setState({selectedIndex: index}, () => {
      this.props.navigation.navigate(route);
    });
  };

  renderButtons = () => {
    const {selectedIndex} = this.state;
    return buttons.map((button, i) => {
      return (
        <TouchableOpacity
          onPress={() => this.handleRoutePress(button.id, button.url)}
          style={styles.tabButton}
          key={i}
          activeOpacity={1}
        >
          <Image
            resizeMode="contain"
            resizeMethod="scale"
            style={[styles.buttonIcon, {width: button.iconWidth, height: button.iconHeight}]}
            source={selectedIndex === button.id ? button.iconActive : button.iconPassive}
          />
          <Text
            style={[
              styles.buttonText,
              {
                color: selectedIndex === button.id
                  ? MyStyle.color.activeColor
                  : MyStyle.color.passiveColor
              }
            ]}
          >
            {button.label}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderButtons()}
      </View>
    );
  }
}

export default MyTab;
