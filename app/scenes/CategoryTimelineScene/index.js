import React, { Component } from 'react'
import { View } from 'react-native'
import _isEqual from 'lodash/isEqual'
import withQuery from './index.gql'
import CategoryTimelineContainer from '../../containers/CategoryTimelineContainer'
import TagsListContainer from '../../containers/TagsListContainer'
import AnalyticsContainer from '../../containers/AnalyticsContainer'
import updateCurrentScene from '../../common/utils/updateCurrentScene'

class CategoryTimelineScene extends Component {
  constructor (props) {
    super(props)
    updateCurrentScene(this, props.navigation.state.routeName)
  }

  shouldComponentUpdate (nextProps) {
    const loadingChanged = this.props.data.loading !== nextProps.data.loading
    const categoryChanged = !_isEqual(this.props.data.category, nextProps.data.category)
    return loadingChanged || categoryChanged
  }

  render () {
    console.log('      CategoryTimelineScene.render', this.props.navigation.state.routeName)
    const { category, loading } = this.props.data
    if (loading) return null

    return (
      <AnalyticsContainer scene={category.slug} screenName={`/popular/${category.slug}`}>
        <View>
          <TagsListContainer category={category} />
          <CategoryTimelineContainer category={category} />
        </View>
      </AnalyticsContainer>
    )
  }
}

export default withQuery(CategoryTimelineScene)
