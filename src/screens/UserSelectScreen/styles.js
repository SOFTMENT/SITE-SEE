import { StyleSheet } from 'react-native';
import Util from '../../common/util';
import { spacing } from '../../common/variables';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingBottom: spacing.small,
  },
  circleView: {
    flex: 0.3,
    width: '100%',
  },
  circle: {
    position: 'absolute',
    top: 40,
    left: 75,
    height: 100,
    width: 100,
    backgroundColor: '#fff7fc',
    borderRadius: 50,
  },
  circle1: {
    position: 'absolute',
    top: 80,
    left: -35,
    height: 100,
    width: 100,
    backgroundColor: '#fff7fc',
    borderRadius: 50,
  },
  logoView: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: Util.getWidth(60),
    height:50,
    //height: 200,
  },
  btnView: {
    flex: 0.3,
    width: '80%',
    alignItems: 'center',
    paddingVertical: spacing.large,
  },
  btn: {
    borderColor: colors.btnColor,
    borderWidth: 2,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  text: {
    color: colors.btnColor,
    //fontFamily:fonts.semiBold
  },
});

export default styles;
