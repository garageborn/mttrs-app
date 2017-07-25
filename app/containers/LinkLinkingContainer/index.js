import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from '../../actions/index'
import withQuery from './index.gql'

class LinkLinkingContainer extends Component {
  componentWillReceiveProps (nextProps) {
    if (this.props.data.loading === nextProps.data.loading) return
    this.openLink(nextProps)
  }

  render () {
    return null
  }

  openLink (props) {
    const { dispatch, data } = props
    if (data.loading || !data.link) return
    this.props.resetNavigating()
    dispatch(NavigationActions.link(data.link.slug))
  }
}

LinkLinkingContainer.propTypes = {
  resetNavigating: PropTypes.func.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired
  }).isRequired
}

const LinkLinkingContainerWithData = withQuery(LinkLinkingContainer)
export default connect()(LinkLinkingContainerWithData)
