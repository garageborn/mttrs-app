import React, { PropTypes, Component } from 'react'
import { Image, Linking, StatusBar, Text, TouchableHighlight, View } from 'react-native'
import SafariView from 'react-native-safari-view'
import { Actions } from 'react-native-router-flux'
import styles from '../styles/Story'
import ComponentsJoiner from '../utils/ComponentsJoiner'
import * as cloudinary from '../../common/utils/Cloudinary'

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
            <Text style={styles.category}>Category</Text>
            <Text style={styles.publisher}>{this.getFirstPublisher()}</Text>
          </View>
          <View style={styles.cover}>
            <Image style={styles.coverImage} resizeMode='cover' source={{uri: this.getImage()}}>
              {/* <View style={styles.coverOverlay}> */}
                <Text style={styles.title} numberOfLines={3}>{story.title}</Text>
              {/* </View> */}
            </Image>
          </View>
        </View>
      </TouchableHighlight>
      // <TouchableHighlight onPress={this.openStory} activeOpacity={0.7} underlayColor='white'>
      //   <View style={styles.story}>
      //     <Image source={{uri: this.getImage()}} style={styles.storyThumb} />
      //     <View style={styles.storyTitleContainer}>
      //       <Text numberOfLines={3}>{story.title}</Text>
      //       <Text style={styles.storyInfo}><Text style={styles.storyInfoFrom}>From</Text> {this.getPublishers()}</Text>
      //     </View>
      //   </View>
      // </TouchableHighlight>
    )
  }

  getImage () {
    const { story } = this.props

    if (!story.image_source_url) return
    let options = { type: 'fetch', width: 200, height: 200, crop: 'fit', secure: true }

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

  getFirstPublisher() {
    const { links } = this.props.story

    if (!links) return

    let link = links[0]
    return link.publisher.name
  }

  getPublishers() {
    const { links } = this.props.story

    if (!links) return

    let publishers = links.map(link => {
      return link.publisher.name
    })

    return ComponentsJoiner(publishers)
  }
}

Story.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired
}

export default Story
