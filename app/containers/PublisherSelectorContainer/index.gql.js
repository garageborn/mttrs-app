import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Query = gql`
query {
  publishers(with_stories: true, order_by_name: true) {
    icon_id
    id
    name
    display_name
    slug
    today_stories_count
  }
}
`

export default function (PublishersListContainer) {
  return graphql(Query)(PublishersListContainer)
}
