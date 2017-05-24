import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import _compact from 'lodash/compact'

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
      const publisherIds = _compact(props.favoritePublishers.items)
      const categoryIds = _compact([props.favorites.categoryId])
      return { variables: { publisherIds, categoryIds } }
    }
  })(FavoritePublishersSelector)
}
