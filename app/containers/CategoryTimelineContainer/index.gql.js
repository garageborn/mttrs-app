import { PixelRatio } from 'react-native'
import gql from 'graphql-tag'
import graphql, { defaultVariables } from '../TimelineContainer/index.gql'
import _result from 'lodash/result'

const Query = gql`
  query($cursor: Int, $dpr: Int, $type: String!, $limit: Int!, $categorySlug: String, $tagSlug: String) {
    timeline(cursor: $cursor, type: $type, limit: $limit, category_slug: $categorySlug, tag_slug: $tagSlug) {
      date
      stories {
        id
        total_social
        headline
        summary
        category { id name color slug }
        main_link {
          id
          title
          url
          amp_url
          slug
          image(dpr: $dpr) {
            thumb
          }
          publisher {
            id
            name
            display_name
            icon(dpr: $dpr) {
              small
            }
            slug
            restrict_content
          }
        }
        publishers(limit: 5) {
          id
          name
          display_name
          icon(dpr: $dpr) { xsmall }
          slug
          restrict_content
        }
        links_count
      }
    }
  }
`

export default function (CategoryTimelineContainer) {
  return graphql(Query, {
    options (props) {
      const categorySlug = _result(props, 'category.slug')
      const tagSlug = _result(props, 'selectedTag.slug')

      return {
        variables: {
          ...defaultVariables,
          tagSlug,
          categorySlug,
          type: 'category',
          dpr: PixelRatio.get()
        }
      }
    }
  })(CategoryTimelineContainer)
}
