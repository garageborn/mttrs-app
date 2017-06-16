import gql from 'graphql-tag'
import graphql, { defaultVariables } from '../TimelineContainer/index.gql'
import prepareArrayParam from '../../common/utils/ArrayParam'
import _result from 'lodash/result'

const Query = gql`
  query($cursor: Int, $type: String!, $limit: Int!, $publisherIds: [Int], $categoryIds: [Int]) {
    timeline(cursor: $cursor, type: $type, limit: $limit, publisher_ids: $publisherIds, category_ids: $categoryIds) {
      date
      stories {
        id
        total_social
        headline
        summary
        category { id name color slug }
        main_link(publisher_ids: $publisherIds) {
          id
          title
          url
          amp_url
          slug
          image_source_url
        }
        publishers(limit: 5, publisher_ids: $publisherIds) {
          id name display_name icon_id slug restrict_content
        }
        links_count
      }
    }
  }
`

export default function (FavoritesTimeline) {
  return graphql(Query, {
    options (props) {
      const publisherIds = prepareArrayParam([props.publisherIds], null)
      const categoryIds = prepareArrayParam([_result(props, 'selectedCategory.id')], null)

      return {
        variables: {
          ...defaultVariables,
          type: 'favorites',
          publisherIds,
          categoryIds
        }
      }
    }
  })(FavoritesTimeline)
}
