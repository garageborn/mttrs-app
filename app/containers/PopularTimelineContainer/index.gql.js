import { PixelRatio } from 'react-native'
import gql from 'graphql-tag'
import graphql, { defaultVariables } from '../TimelineContainer/index.gql'

const Query = gql`
  query($cursor: Int, $dpr: Int, $type: String, $limit: Int!) {
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
          image(dpr: $dpr) { thumb }
          publisher {
            id
            name
            display_name
            icon(dpr: $dpr) { small }
            slug
            restrict_content
          }
        }
        links_count
        publishers(limit: 5) {
          id
          name
          display_name
          icon(dpr: $dpr) { xsmall }
          slug
          restrict_content
        }
      }
    }
  }
`

export default function (PopularTimeline) {
  return graphql(Query, {
    options (props) {
      return {
        variables: {
          ...defaultVariables,
          dpr: PixelRatio.get(),
          type: 'popular'
        }
      }
    }
  })(PopularTimeline)
}
