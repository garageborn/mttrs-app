import React, { Component } from 'react'
import { View } from 'react-native'
import withQuery from './index.gql'
import CategoryTimelineContainer from '../../containers/CategoryTimelineContainer'
import TagsListContainer from '../../containers/TagsListContainer'

class CategoryTimelineScene extends Component {
  render () {
    const { category, loading } = this.props.data
    if (loading) return null

    return (
      <View>
        <TagsListContainer category={category} />
        <CategoryTimelineContainer category={category} />
      </View>
    )
  }
}

export default withQuery(CategoryTimelineScene)
