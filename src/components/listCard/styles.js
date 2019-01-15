import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: theme.space.medium,
    height: theme.elements.listCardHeight,
    backgroundColor: theme.color.primary,
    marginTop: theme.space.medium,
    marginRight: theme.space.medium,
    marginLeft: theme.space.medium,
    borderRadius: 22
  },
  arrowWrapper: {
    position: 'absolute',
    right: theme.space.medium,
    height: '100%',
    justifyContent: 'center'
  },
  arrow: {
    width: 10,
    height: 16
  },
  cardTitle: {
    fontSize: theme.text.regular,
    color: theme.color.primaryLight,
    fontWeight: 'bold',
    marginBottom: theme.space.tiny,

    maxWidth: 270
  },
  cardText: {
    fontSize: theme.text.small,
    color: theme.color.primaryLight
  }
});

export default styles;
