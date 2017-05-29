import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import _result from 'lodash/result'
import prepareArrayParam from '../../common/utils/ArrayParam'

const Query = gql`
query($publisherIds: [Int], $categoryIds: [Int]) {
  publishers(with_stories: true, order_by_name: true, with_ids: $publisherIds, category_ids: $categoryIds) {
    display_name
    icon_id
    id
    name
    slug
  }
}
`

export default function (FavoritePublishersSelector) {
  return graphql(Query, {
    options (props) {
      const publisherIds = prepareArrayParam(props.publisherIds, null)
      const categoryIds = prepareArrayParam([_result(props, 'selectedCategory.id')], null)
      return { variables: { publisherIds, categoryIds } }
    }
  })(FavoritePublishersSelector)
}
