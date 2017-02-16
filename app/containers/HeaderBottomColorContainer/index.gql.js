import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Query = gql `
query {
  categories(with_stories: true, ordered: true) {
    color
    id
    slug
  } 
}
`

export default function (CategoryColorsListContainer) {
  return graphql(Query)(CategoryColorsListContainer)
}
