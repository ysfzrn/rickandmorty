import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: theme.space.medium,
    height: theme.elements.detailCardHeight,
    marginTop: theme.space.medium,
    backgroundColor: theme.color.residentCardColor,
    borderRadius: 15,
    paddingVertical: theme.space.tiny * 2
  },
  imageContainer: {
    width: 71,
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: theme.space.small * 2
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: theme.space.medium
  },
  cardTitle: {
    fontSize: theme.text.regular,
    fontWeight: 'bold',
    color: '#434343',
    marginBottom: theme.space.tiny * 2
  },
  detailTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.space.tiny
  },
  detailTextLabel: {
    fontSize: theme.text.small,
    color: '#878787',
    fontWeight: '600'
  },
  detailText: {
    fontSize: theme.text.small,
    color: '#434343',
    fontWeight: '600',
    maxWidth: 125
  }
});

export default styles;
