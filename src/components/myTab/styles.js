import {StyleSheet} from 'react-native';
import MyStyle from '../../utils/theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: MyStyle.elements.tab.height,
    backgroundColor: MyStyle.color.tab.background,
    shadowColor: MyStyle.color.tab.shadow,
    shadowOffset: MyStyle.elements.tab.shadowOffset,
    shadowOpacity: MyStyle.elements.tab.shadowOpacity,
    shadowRadius: MyStyle.elements.tab.shadowRadius
  },
  tabButton: {
    flex: 1,
    height: '100%',
    ...MyStyle.utils.flexColumnCenter
  },
  buttonText: {
    fontSize: MyStyle.text.small
  },
  buttonIcon: {
    marginBottom: MyStyle.space.small
  }
});

export default styles;
