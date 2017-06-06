import React from 'react'
import { View } from 'react-native'
import CategoryTimelineContainer from '../../containers/CategoryTimelineContainer'
import TagsListContainer from '../../containers/TagsListContainer'
import AnalyticsContainer from '../../containers/AnalyticsContainer'

const CategoryTimelineScene = ({category}) => (
  <AnalyticsContainer scene={category.slug} screenName={`/popular/${category.slug}`}>
    <View style={{flexGrow: 1}}>
      <TagsListContainer category={category} />
      <CategoryTimelineContainer category={category} />
    </View>
  </AnalyticsContainer>
)

export function buildCategoryTimelineScene (category) {
  return (props) => <CategoryTimelineScene category={category} {...props} />
}

export default CategoryTimelineScene
