import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Query = gql`
query {
  categories(with_stories: true, ordered: true) {
    id
    name
    slug
  }
}
`

export default function (CategoriesTimeline) {
  return graphql(Query)(CategoriesTimeline)
}
