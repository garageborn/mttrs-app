import gql from 'graphql-tag'
import graphql, { defaultVariables } from '../Timeline/index.gql'

const Query = gql`
  query($cursor: Int, $type: String!, $limit: Int!, $categorySlug: String) {
    timeline(cursor: $cursor, type: $type, limit: $limit, category_slug: $categorySlug) {
      date
      stories {
        id
        total_social
        headline
        summary
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
      return {
        variables: {
          ...defaultVariables,
          categorySlug: props.model.slug,
          type: 'category'
        }
      }
    }
  })(HomeTimeline)
}
