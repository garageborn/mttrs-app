import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Query = gql`
query {
  categories(with_stories: true, ordered: true) {
    id
    name
    slug
    tags_count(with_recent_stories: true)
  }
}
`

export default function (CategoriesTimeline) {
  return graphql(Query)(CategoriesTimeline)
}
