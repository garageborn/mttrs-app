import React, { Component, PropTypes } from 'react'
import { Image, View } from 'react-native'
import ShareButtonContainer from '../../containers/ShareButtonContainer'
import styles from '../HeaderButton/styles'

class HeaderShareButton extends Component {
  render () {
    return (
      <ShareButtonContainer link={this.props.link}>
        <View style={styles.container}>
          {this.content}
        </View>
      </ShareButtonContainer>
    )
  }

  get content () {
    return <Image source={require('./assets/image.png')} />
  }
}

HeaderShareButton.propTypes = {
  link: PropTypes.object.isRequired
}

export default HeaderShareButton
