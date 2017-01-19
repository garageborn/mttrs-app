import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Query = gql `query { categories(ordered: true) { id slug color } }`

export default function (CategoryColorsListContainer) {
  return graphql(Query)(CategoryColorsListContainer
  )
}
