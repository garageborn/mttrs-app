import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import _result from 'lodash/result'

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
      const categorySlug = _result(props, 'category.slug')
      return {
        variables: { categorySlug }
      }
    }
  })(TagsListContainer)
}
