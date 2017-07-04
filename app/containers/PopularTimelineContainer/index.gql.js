import gql from 'graphql-tag'
import graphql, { defaultVariables } from '../TimelineContainer/index.gql'

const Query = gql`
  query($cursor: Int, $type: String, $limit: Int!) {
    timeline(cursor: $cursor, type: $type, limit: $limit) {
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
          image_url(format: "95x120")
          publisher { id name display_name icon_id slug restrict_content }
        }
        links_count
        publishers(limit: 5) { id name display_name icon_id slug restrict_content }
      }
    }
  }
`

export default function (PopularTimeline) {
  return graphql(Query, {
    options (props) {
      return { variables: { ...defaultVariables, type: 'popular' } }
    }
  })(PopularTimeline)
}
