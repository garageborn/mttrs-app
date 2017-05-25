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
    skip: (props) => {
      return !props.favoritePublishers.isLoaded
    },
    options (props) {
      const publisherIds = prepareArrayParam(props.favoritePublishers.items, null)
      const categoryIds = prepareArrayParam([_result(props, 'favorites.category.id')], null)
      return { variables: { publisherIds, categoryIds } }
    }
  })(FavoritePublishersSelector)
}
