import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Query = gql`
query($categorySlug: String!) {
  category(slug: $categorySlug) {
    id
    name
    slug
  }
}
`

export default function (CategoryTimeline) {
  return graphql(Query, {
    options (props) {
      const categorySlug = props.navigation.state.routeName

      return {
        variables: { categorySlug }
      }
    }
  })(CategoryTimeline)
}
