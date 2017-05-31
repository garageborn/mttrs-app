import React, { Component, PropTypes } from 'react'
import { View, FlatList } from 'react-native'
import styles from './styles'
import StoryLinkContainer from '../../containers/StoryLinkContainer'
import LinearGradient from 'react-native-linear-gradient'

class StoryLinks extends Component {
  constructor (props) {
    super(props)

    this.shouldItemUpdate = this.shouldItemUpdate.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

  render () {
    if (!this.mainLink) return
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <StoryLinkContainer type='header' story={this.props.story} link={this.mainLink} />
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
        shouldItemUpdate={this.shouldItemUpdate}
        keyExtractor={this.extractKey}
        style={styles.linksList}
        data={this.otherLinks}
        story={this.props.story}
        renderItem={this.renderRow}
      />
    )
  }

  extractKey (item, index) {
    return `storyLink_${index}`
  }

  renderRow (data) {
    return (
      <StoryLinkContainer
        type='list'
        story={this.props.story}
        rowID={data.index}
        link={data.item}
      />
    )
  }

  shouldItemUpdate (props, nextProps) {
    return props.item.id !== nextProps.item.id
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

StoryLinks.propTypes = {
  story: PropTypes.shape({
    main_link: linkPropsTypes.isRequired,
    other_links: PropTypes.arrayOf(linkPropsTypes).isRequired
  }).isRequired
}

export default StoryLinks
