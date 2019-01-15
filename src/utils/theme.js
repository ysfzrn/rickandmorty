import {Dimensions, Platform} from 'react-native';

export const isIphoneX = () => {
  let d = Dimensions.get('window');
  const {height, width} = d;

  return Platform.OS === 'ios' && (height === 812 || width === 812);
};

const style = {
  text: {
    small: 12,
    regular: 20,
    title: 30,
    xlarge: 48
  },
  color: {
    tab: {
      background: '#ffffff',
      shadow: '#0000000f'
    },
    primary: '#00b4c5',
    secondary: '#ede700',
    background: '#ffffff',

    primaryLight: '#ffffff',
    secondaryLight: '#4f4d00',

    passiveColor: '#a1a1a1',
    activeColor: '#000000',

    borderColor: '#ececec',

    residentCardColor: '#eaf8fa',
    episodeCardColor: '#fdfcdb'
  },
  elements: {
    tab: {
      height: isIphoneX() ? 101 : 60,
      shadowOffset: {width: 0, height: -1},
      shadowOpacity: 0.8,
      shadowRadius: 4
    },
    headerHeight: isIphoneX() ? 88 : 80,
    detalPageHederHeight: isIphoneX() ? 106 : 100,
    listCardHeight: 77,
    detailCardHeight: 115,
    cardImageWidth: 51
  },
  space: {
    tiny: isIphoneX() ? 5 : 3,
    small: isIphoneX() ? 15 : 10,
    medium: isIphoneX() ? 23 : 18
  },
  utils: {
    flexColumnCenter: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    flexRowCenter: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }
};

export default style;
