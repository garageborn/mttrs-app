import React, { Component, PropTypes } from 'react'
import _isEqual from 'lodash/isEqual'
import PopularNavigator from '../../navigators/PopularNavigator'
import PopularSceneLoading from '../../components/PopularSceneLoading'
import withQuery from './index.gql'

class PopularScene extends Component {
  shouldComponentUpdate (nextProps) {
    const loadingChanged = this.props.data.loading !== nextProps.data.loading
    const categoriesChanged = !_isEqual(this.props.data.categories, nextProps.data.categories)
    return loadingChanged || categoriesChanged
  }

  render () {
    if (this.props.data.loading) return this.renderLoading()
    const Navigator = PopularNavigator(this.props.data.categories)
    return <Navigator />
  }

  renderLoading () {
    return (
      <PopularSceneLoading />
    )
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
