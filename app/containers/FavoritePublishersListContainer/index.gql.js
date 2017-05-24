import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import _compact from 'lodash/compact'

const Query = gql`
query($publisherIds: [Int]) {
  publishers(with_stories: true, order_by_name: true, with_ids: $publisherIds) {
    display_name
    icon_id
    id
    name
    slug
  }
}
`
export default function (FavoritePublishers) {
  return graphql(Query, {
    skip: (props) => {
      return !props.favorites.isLoaded
    },
    options (props) {
      const { selected, items } = props.favorites
      const publisherIds = selected ? [selected] : items
      return {
        variables: {
          publisherIds: _compact(publisherIds)
        }
      }
    }
  })(FavoritePublishers)
}
