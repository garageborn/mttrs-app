import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Query = gql`
query {
  categories(with_stories: true, ordered: true) {
    id
    image_id
    name
    slug
  }
}
`

export default function (TimelineContainer) {
  return graphql(Query)(TimelineContainer)
}
