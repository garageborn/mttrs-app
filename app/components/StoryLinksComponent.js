import React, { Component, PropTypes } from 'react'
import { View, ListView } from 'react-native'
import styles from '../styles/StoryLinks'
import StoryLink from '../components/StoryLink'
import LinearGradient from 'react-native-linear-gradient'

class StoryLinksComponent extends Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.dataSource = this.dataSource.bind(this)
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
            openPublisher={this.props.openPublisher}
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
      <ListView
        style={styles.linksList}
        dataSource={this.dataSource()}
        renderRow={this.renderRow}
      />
    )
  }

  dataSource () {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    return ds.cloneWithRows(this.otherLinks)
  }

  renderRow (rowData, sectionID, rowID) {
    return (
      <StoryLink
        linkType='list'
        rowID={rowID}
        link={rowData}
        openLink={this.props.openLink}
        openPublisher={this.props.openPublisher}
      />
    )
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
  openLink: PropTypes.func.isRequired,
  openPublisher: PropTypes.func.isRequired
}

export default StoryLinksComponent
