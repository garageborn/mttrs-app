import gql from 'graphql-tag'
import _result from 'lodash/result'
import graphql, { defaultVariables } from '../TimelineContainer/index.gql'

const Query = gql`
  query($cursor: Int, $type: String!, $limit: Int!, $categorySlug: String, $publisherSlug: String) {
    timeline(cursor: $cursor, type: $type, limit: $limit, category_slug: $categorySlug, publisher_slug: $publisherSlug) {
      date
      stories {
        id
        total_social
        headline
        summary
        category { id name color slug }
        main_link(publisher_slug: $publisherSlug) {
          id
          title
          url
          amp_url
          slug
          image {
            thumb
          }
          publisher { id name display_name icon_id slug restrict_content }
        }
        publishers(limit: 5, publisher_slug: $publisherSlug) {
          id name display_name icon_id slug restrict_content
        }
        links_count
      }
    }
  }
`

export default function (PublisherTimeline) {
  return graphql(Query, {
    options (props) {
      const publisherSlug = props.publisher.slug
      const categorySlug = _result(props, 'selectedCategory.slug')
      return {
        variables: {
          ...defaultVariables,
          categorySlug,
          publisherSlug,
          type: 'publisher'
        }
      }
    }
  })(PublisherTimeline)
}
