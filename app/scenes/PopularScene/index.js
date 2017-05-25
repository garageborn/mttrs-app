import React, { Component, PropTypes } from 'react'
import PopularNavigator from '../../navigators/PopularNavigator'
import withQuery from './index.gql'

class PopularScene extends Component {
  render () {
    if (this.props.data.loading) return null
    const Navigator = PopularNavigator(this.props.data.categories)
    return <Navigator />
  }
}

PopularScene.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    categories: PropTypes.array
  }).isRequired
}

PopularScene.navigationOptions = props => {
  return {
    headerMode: 'none'
  }
}

export default withQuery(PopularScene)
