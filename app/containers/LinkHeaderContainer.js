import React, { Component, PropTypes } from 'react'
import { InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import HeaderWebview from '../components/HeaderWebView'
import * as cloudinary from '../common/utils/Cloudinary'
import { NavigationActions } from '../actions/index'
import { withAnalytics } from '../config/AnalyticsProvider'

class LinkHeaderContainer extends Component {
  constructor (props) {
    super(props)
    this.close = this.close.bind(this)
    this.openPublisher = this.openPublisher.bind(this)
  }

  close () {
    this.props.dispatch(NavigationActions.back())
  }

  get publisherLogo () {
    const { publisher } = this.props.link
    if (!publisher.icon_id) return
    const uri = cloudinary.id(publisher.icon_id, { secure: true })
    return { uri }
  }

  openPublisher (publisher) {
    InteractionManager.runAfterInteractions(() => {
      this.props.dispatch(NavigationActions.selectPublisher(publisher))
    })
  }

  render () {
    const { link } = this.props
    return (
      <HeaderWebview
        link={link}
        close={this.close}
        publisher={link.publisher}
        publisherLogo={this.publisherLogo}
        onPress={this.openPublisher}
      />
    )
  }
}

LinkHeaderContainer.propTypes = {
  link: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    publisher: PropTypes.shape({
      icon_id: PropTypes.string
    }).isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired
}

const LinkHeaderWithAnalytics = withAnalytics(LinkHeaderContainer)
export default connect()(LinkHeaderWithAnalytics)
