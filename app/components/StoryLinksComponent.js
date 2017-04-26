import React, { Component, PropTypes } from 'react'
import { View, FlatList } from 'react-native'
import styles from '../styles/StoryLinks'
import StoryLink from '../components/StoryLink'
import LinearGradient from 'react-native-linear-gradient'

class StoryLinksComponent extends Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
  }

  render () {
    if (!this.mainLink) return
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <StoryLink
            linkType='header'
            link={this.mainLink}
            openLink={this.props.openLink}
          />
        </View>
        {this.renderListView()}
        <LinearGradient
          colors={['rgba(255,255,255,.2)', 'rgba(255,255,255,.6)', 'rgba(255,255,255,.8)']}
          style={styles.gradient}
        />
      </View>
    )
  }

  renderListView () {
    if (!this.otherLinks || !this.otherLinks.length) return
    return (
      <FlatList
        keyExtractor={this.extractKey}
        style={styles.linksList}
        data={this.otherLinks}
        renderItem={this.renderRow}
      />
    )
  }

  renderRow (data) {
    return (
      <StoryLink
        linkType='list'
        rowID={data.index}
        link={data.item}
        openLink={this.props.openLink}
      />
    )
  }

  extractKey (item, index) {
    return `storyLink_${index}`
  }

  get mainLink () {
    return this.props.story.main_link
  }

  get otherLinks () {
    return this.props.story.other_links
  }
}

const linkPropsTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  total_social: PropTypes.number.isRequired,
  publisher: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon_id: PropTypes.string
  }).isRequired
})

StoryLinksComponent.propTypes = {
  story: PropTypes.shape({
    main_link: linkPropsTypes.isRequired,
    other_links: PropTypes.arrayOf(linkPropsTypes).isRequired
  }).isRequired,
  openLink: PropTypes.func.isRequired
}

export default StoryLinksComponent
