import gql from 'graphql-tag'
import graphql, { defaultVariables } from '../Timeline/index.gql'

const Query = gql`
  query($cursor: Int, $type: String, $limit: Int!) {
    timeline(cursor: $cursor, type: $type, limit: $limit, with_summary: true) {
      date
      stories {
        id
        total_social
        headline
        summary
        category { name color slug }
        main_link {
          title
          url
          amp_url
          slug
          image_source_url
          publisher { name display_name icon_id slug restrict_content }
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
