import React, { Component, PropTypes } from 'react'
import PopularNavigator from '../../navigators/PopularNavigator'
import withQuery from './index.gql'

class PopularScene extends Component {
  render () {
    if (this.props.data.loading) return null
    return <PopularNavigator categories={this.props.data.categories} />
  }
}

PopularScene.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool
  }).isRequired
}

export default withQuery(PopularScene)
