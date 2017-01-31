import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Query = gql`
query {
  publishers(with_stories: true, order_by_name: true) {
    icon_id
    id
    name
    slug
  }
}
`

export default function (PublisherMenuContainer) {
  return graphql(Query)(PublisherMenuContainer)
}
