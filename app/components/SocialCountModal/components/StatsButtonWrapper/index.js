import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import ShareButtonContainer from '../../../../containers/ShareButtonContainer'
import styles from './styles.js'

const StatsButtonWrapper = ({ link, story }) => (
  <View style={styles.container}>
    <ShareButtonContainer link={link} story={story}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>COMPARTILHAR</Text>
      </View>
    </ShareButtonContainer>
  </View>
)

StatsButtonWrapper.propTypes = {
  link: PropTypes.object.isRequired,
  story: PropTypes.object.isRequired
}

export default StatsButtonWrapper
