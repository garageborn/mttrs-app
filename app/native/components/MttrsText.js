import React from 'react'
import ReactNative, { StyleSheet } from 'react-native'

export default function Text({ style, ...props }) {
  return <ReactNative.Text style={[styles.font, style]} {...props} />
}

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Indie Flower'
  }
})
