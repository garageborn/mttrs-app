import React from 'react'
import {
  StyleSheet,
  ProgressViewIOS,
  ProgressBarAndroid,
  Platform
} from 'react-native'

const ProgressBar = ({ progress, color }) => {
  if (Platform.OS === 'ios') {
    return <ProgressViewIOS style={styles.progressBar} progress={progress} progressTintColor={color} />
  } else {
    return <ProgressBarAndroid style={styles.progressBar} progress={progress} indeterminate={false} styleAttr='Horizontal' color={color} />
  }
}

const styles = StyleSheet.create({
  progressBar: {
    marginTop: Platform.OS === 'ios' ? 0 : -6
  }
})

export default ProgressBar
