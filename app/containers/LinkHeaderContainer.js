import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Share from 'react-native-share'
import HeaderWebview from '../components/HeaderWebView'
import * as cloudinary from '../common/utils/Cloudinary'
import { NavigationActions } from '../actions/index'

class LinkHeaderContainer extends Component {
  constructor (props) {
    super(props)
    this.close = this.close.bind(this)
    this.share = this.share.bind(this)
  }

  share () {
    const { link } = this.props

    let shareOptions = {
      title: link.title,
      message: link.description || link.title,
      url: link.url
    }

    return Share.open(shareOptions)
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

  render () {
    return (
      <HeaderWebview
        link={this.props.link}
        share={this.share}
        close={this.close}
        publisherLogo={this.publisherLogo}
      />
    )
  }
}

LinkHeaderContainer.propTypes = {
  link: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect()(LinkHeaderContainer)
