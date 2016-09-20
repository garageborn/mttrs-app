import React, { PropTypes, Component } from 'react'
import { Image, Linking, StatusBar, Text, TouchableHighlight, View } from 'react-native'
import SafariView from 'react-native-safari-view'
import LinearGradient from 'react-native-linear-gradient'
import styles from '../styles/Story'
import ComponentsJoiner from '../utils/ComponentsJoiner'
import * as cloudinary from '../../common/utils/Cloudinary'
import nyt from '../assets/nyt.png'

class Story extends Component {
  constructor(props) {
    super(props)

    this.openStory = this.openStory.bind(this)
    this.openSafariView = this.openSafariView.bind(this)
    this.openLinkingView = this.openLinkingView.bind(this)
  }

  render() {
    const { story } = this.props
    return (
      <TouchableHighlight onPress={this.openStory} activeOpacity={0.7} underlayColor='white'>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.category}>
              <Image style={styles.categoryIcon} source={require('../assets/business.png')} />
              <Text style={styles.categoryTitle}>Category</Text>
            </View>
            {this.getPublishers()}
          </View>
          <View style={styles.cover}>
            <Image style={styles.coverImage} resizeMode='cover' source={{uri: this.getImage()}}>
              <LinearGradient style={styles.coverOverlay} colors={['transparent', 'rgba(0, 0, 0, .6)']}>
                <Text style={styles.title} numberOfLines={3}>{story.title}</Text>
              </LinearGradient>
            </Image>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  getImage () {
    const { story } = this.props

    if (!story.image_source_url) return
    let options = { type: 'fetch', width: 350, height: 255, crop: 'fit', secure: true }

    return cloudinary.url(story.image_source_url, options)
  }

  openStory() {
    SafariView.isAvailable()
      .then(this.openSafariView)
      .catch(this.openLinkingView)
  }

  openSafariView() {
    StatusBar.setBarStyle('default')
    SafariView.addEventListener('onDismiss', () => StatusBar.setBarStyle('light-content'))
    SafariView.show({ url: this.props.story.url, readerMode: true })
  }

  openLinkingView(){
    Linking.openURL(this.props.story.url)
  }

  getPublishers() {
    const { links } = this.props.story

    if (!links) return

    if (links.length === 1) {
      return (
        <View style={styles.publisher}>
          <Image style={styles.publisherLogo} source={require('../assets/nyt.png')} />
        </View>
      )
    }

    if (links.length >= 2) {
      return (
        <View style={styles.publisher}>
          <Image style={styles.publisherLogo} source={require('../assets/nyt.png')} />
          <Text style={styles.publisherTitle}>+{links.length - 1}</Text>
        </View>
      )
    }
  }
}

Story.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired
}

export default Story
