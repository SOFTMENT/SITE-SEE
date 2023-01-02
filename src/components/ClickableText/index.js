import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
const ClickableText = props =>  {
const {title,extraStyle,onPress} = props;
return (
  <TouchableOpacity onPress={onPress}>
    <Text
      adjustsFontSizeToFit={Boolean(true)}
      style={[styles.textStyle,extraStyle]}
      textDecorationColor={'transparent'}
    >
      {title}
    </Text>
  </TouchableOpacity>
  );
};
ClickableText.propTypes = {
  textStyle: PropTypes.oneOfType(PropTypes.number, PropTypes.object),
  title: PropTypes.string,
};

ClickableText.defaultProps = {
  textStyle: {},
  title: '',
};
const styles = StyleSheet.create({
  
})



export default ClickableText;
