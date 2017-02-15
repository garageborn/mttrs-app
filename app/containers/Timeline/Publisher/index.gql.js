import gql from 'graphql-tag'
import graphql, { defaultVariables } from '../index.gql'

const Query = gql`
  query($days: Int!, $offset: Int, $timezone: String, $type: String!, $perDay: Int!, $publisherSlug: String) {
    timeline(days: $days, offset: $offset, timezone: $timezone, type: $type) {
      date
      stories(limit: $perDay, popular: true, publisher_slug: $publisherSlug) {
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
