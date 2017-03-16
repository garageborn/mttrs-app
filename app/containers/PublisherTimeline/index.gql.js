import gql from 'graphql-tag'
import graphql, { defaultVariables } from '../Timeline/index.gql'

const Query = gql`
  query($cursor: Int, $type: String!, $limit: Int!, $publisherSlug: String) {
    timeline(cursor: $cursor, type: $type, limit: $limit, publisher_slug: $publisherSlug) {
      date
      stories {
        id
        total_social
        headline
        summary
        category { name color slug }
        main_link(publisher_slug: $publisherSlug) {
          title
          url
          slug
          image_source_url
          publisher { name icon_id slug restrict_content }
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
