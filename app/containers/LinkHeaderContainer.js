import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Share from 'react-native-share'
import HeaderWebview from '../components/HeaderWebView'
import * as cloudinary from '../common/utils/Cloudinary'
import { NavigationActions } from '../actions/index'
import { TENANTS } from '../constants/Tenants'

class LinkHeaderContainer extends Component {
  constructor (props) {
    super(props)
    this.close = this.close.bind(this)
    this.share = this.share.bind(this)
  }

  share () {
    const { link } = this.props.params

    let url = this.buildUrl(link.slug)

    let shareOptions = {
      title: link.title,
      message: link.description || link.title,
      url
    }

    return Share.open(shareOptions)
  }

  close () {
    this.props.dispatch(NavigationActions.back())
  }

  buildUrl (slug) {
    let { currentTenantId } = this.props
    let tenant = TENANTS.find(tenant => currentTenantId === tenant.id)

    return `${tenant.sharingDomain}/link/${slug}`
  }

  get publisherLogo () {
    const { publisher } = this.props.params.link
    if (!publisher.icon_id) return
    const uri = cloudinary.id(publisher.icon_id, { secure: true })
    return { uri }
  }

  render () {
    return (
      <HeaderWebview
        params={this.props.params}
        share={this.share}
        close={this.close}
        publisherLogo={this.publisherLogo}
      />
    )
  }
}

LinkHeaderContainer.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  currentTenantId: PropTypes.string.isRequired
}

let mapStateToProps = (state) => {
  return {
    currentTenantId: state.StorageReducer.tenant.name
  }
}

export default connect(mapStateToProps)(LinkHeaderContainer)
