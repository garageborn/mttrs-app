import gql from 'graphql-tag'
import graphql, { defaultVariables } from '../index.gql'

const Query = gql`
  query($cursor: Int, $timezone: String, $type: String!, $limit: Int!, $publisherSlug: String) {
    timeline(cursor: $cursor, timezone: $timezone, type: $type, limit: $limit, publisher_slug: $publisherSlug) {
      date
      stories {
        id
        total_social
        headline
        summary
        main_link(publisher_slug: $publisherSlug) {
          title
          url
          slug
          image_source_url
          publisher { name icon_id slug }
        }
        other_links_count
      }
    }
  }
`

export default function (HomeTimeline) {
  return graphql(Query, {
    options (props) {
      return {
        variables: {
          ...defaultVariables,
          publisherSlug: props.model.slug,
          type: 'publisher'
        }
      }
    }
  })(HomeTimeline)
}
