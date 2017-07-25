import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from '../../actions/index'
import withQuery from './index.gql'

class PublisherLinkingContainer extends Component {
  componentWillReceiveProps (nextProps) {
    if (this.props.data.loading === nextProps.data.loading) return
    this.openPublisher(nextProps)
  }

  render () {
    return null
  }

  openPublisher (props) {
    const { dispatch, data } = props
    if (data.loading || !data.publisher) return
    this.props.resetNavigating()
    dispatch(NavigationActions.publisher(data.publisher))
  }
}

PublisherLinkingContainer.propTypes = {
  resetNavigating: PropTypes.func.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired
  }).isRequired
}

const PublisherLinkingContainerWithData = withQuery(PublisherLinkingContainer)
export default connect()(PublisherLinkingContainerWithData)
