import React, { Component, PropTypes } from 'react'
import { View, Modal, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import StoryLinksComponent from '../components/StoryLinksComponent'
import CloseButton from '../components/CloseButton'
import { NavigationActions, AnalyticsActions } from '../actions/index'
import styles from '../styles/StoryLinks'

class StoryLinksContainer extends Component {
  constructor (props) {
    super(props)

    this.openLink = this.openLink.bind(this)
    this.openPublisher = this.openPublisher.bind(this)
    this.close = this.close.bind(this)
  }

  close () {
    this.props.dispatch(NavigationActions.storyLinks({ open: false }))
  }

  openLink (link) {
    this.props.dispatch(AnalyticsActions.trackLink(link))
    this.close()
    this.props.dispatch(NavigationActions.link(this.props.story, link, 'header'))
  }

  openPublisher (publisher) {
    this.close()
    this.props.dispatch(NavigationActions.selectPublisher(publisher))
  }

  render () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible
        onRequestClose={this.close}>
        <View style={styles.modal}>
          { this.renderStoryLinks() }
          <CloseButton onPress={this.close} />
        </View>
      </Modal>
    )
  }

  renderStoryLinks () {
    if (this.props.data.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size='large' color='#FFF' />
        </View>
      )
    } else {
      return (
        <StoryLinksComponent
          story={this.props.data.story}
          openLink={this.openLink}
          />
      )
    }
  }
}

const Query = gql`
  query($id: ID!, $publisherSlug: String) {
    story(id: $id) {
      main_link(publisher_slug: $publisherSlug) {
        title
        url
        slug
        total_social
        publisher { name slug icon_id }
      }
      other_links(publisher_slug: $publisherSlug, popular: true) {
        title
        url
        slug
        total_social
        publisher { name slug icon_id }
      }
    }
  }
`

StoryLinksContainer.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.any.isRequired
  }).isRequired,
  publisherSlug: PropTypes.string
}

const StoryLinksContainerWithData = graphql(Query, {
  options (props) {
    return {
      variables: {
        id: props.story.id,
        publisherSlug: props.publisherSlug
      }
    }
  }
})(StoryLinksContainer)

export default connect()(StoryLinksContainerWithData)
