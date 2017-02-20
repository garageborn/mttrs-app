import gql from 'graphql-tag'
import graphql, { defaultVariables } from '../index.gql'

const Query = gql`
  query($cursor: Int, $timezone: String, $type: String, $limit: Int!) {
    timeline(cursor: $cursor, timezone: $timezone, type: $type, limit: $limit) {
      date
      stories {
        id
        total_social
        headline
        summary
        main_category { name color slug }
        main_link {
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
      return { variables: { ...defaultVariables, type: 'home' } }
    }
  })(HomeTimeline)
}
