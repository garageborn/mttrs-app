import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Query = gql`
query($publishersIds: [Int]) {
  publishers(with_stories: true, order_by_name: true, with_ids: $publishersIds) {
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
      return !props.favorites.isLoaded
    },
    options (props) {
      return {
        variables: { publishersIds: props.favorites.items }
      }
    }
  })(FavoritePublishersSelector)
}
