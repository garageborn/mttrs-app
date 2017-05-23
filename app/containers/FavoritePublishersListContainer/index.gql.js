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
export default function (FavoritePublishers) {
  return graphql(Query, {
    options (props) {
      return {
        variables: { publishersIds: props.publishersIds }
      }
    }
  })(FavoritePublishers)
}
