import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const Query = gql`
  query($categorySlug: String!) {
    tags(with_recent_stories: true, ordered: true, category_slug: $categorySlug) {
      name
      slug
    }
  }
`

export default function (TagsListContainer) {
  return graphql(Query, {
    options (props) {
      return {
        variables: {
          categorySlug: props.categorySlug
        }
      }
    }
  })(TagsListContainer)
}
