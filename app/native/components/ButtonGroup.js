// Via: https://github.com/react-native-community/react-native-elements/blob/master/src/buttons/ButtonGroup.js

import React, { PropTypes } from 'react'
import { View, StyleSheet, TouchableHighlight, Platform, Text } from 'react-native'

let styles = {}

const ButtonGroup = ({
  component,
  onPress,
  buttons,
  containerStyle,
  selectedBackgroundColor,
  textStyle,
  selectedTextStyle,
  underlayColor,
  selectedIndex,
  activeOpacity,
  onHideUnderlay,
  onShowUnderlay,
  setOpacityTo,
  borderStyle
}) => {
  const Component = component || TouchableHighlight

  return (
    <View style={styles.container}>
      {
        buttons.map((button, i) => {
          return (
            <Component
              activeOpacity={activeOpacity}
              onHideUnderlay={onHideUnderlay}
              onShowUnderlay={onShowUnderlay}
              underlayColor={underlayColor || '#FFF'}
              onPress={() => onPress(i)}
              setOpacityTo={setOpacityTo}
              key={i}
              style={[
                styles.button,
                i < buttons.length - 1 && styles.borderRight,
                i < buttons.length - 1 && borderStyle && borderStyle,
                containerStyle && containerStyle,
                selectedIndex === i && {backgroundColor: selectedBackgroundColor || '#FFF'}
              ]}>
              <View style={{flex: 1}}>
                <Text style={[
                  styles.buttonText,
                  textStyle && textStyle,
                  selectedIndex === i && {color: '#FFF'},
                  selectedIndex === i && selectedTextStyle && selectedTextStyle
                ]}>{button}</Text>
              </View>
            </Component>
          )
        })
      }
    </View>
  )
}

styles = StyleSheet.create({
  button: {
    flex: 1
  },
  borderRight: {
    borderRightColor: '#2672D7',
    borderRightWidth: 1
  },
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    borderColor: '#2672D7',
    borderWidth: 2,
    flexDirection: 'row',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },
  buttonText: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center',
    fontSize: 13,
    color: '#FFF',
    ...Platform.select({
      ios: {
        fontWeight: '500'
      }
    })
  }
})

ButtonGroup.propTypes = {
  button: PropTypes.object
}

export default ButtonGroup
