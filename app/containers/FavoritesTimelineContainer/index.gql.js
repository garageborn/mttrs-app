import gql from 'graphql-tag'
import graphql, { defaultVariables } from '../TimelineContainer/index.gql'
import prepareArrayParam from '../../common/utils/ArrayParam'

const Query = gql`
  query($cursor: Int, $type: String!, $limit: Int!, $publisherIds: [Int], $categoryIds: [Int]) {
    timeline(cursor: $cursor, type: $type, limit: $limit, publisher_ids: $publisherIds, category_ids: $categoryIds) {
      date
      stories {
        id
        total_social
        headline
        summary
        category { name color slug }
        main_link(publisher_ids: $publisherIds) {
          title
          url
          amp_url
          slug
          image_source_url
          publisher { id name display_name icon_id slug restrict_content }
        }
        other_links_count
      }
    }
  }
`

export default function (FavoritesTimeline) {
  return graphql(Query, {
    skip: (props) => {
      return !props.favoritePublishers.isLoaded
    },
    options (props) {
      const favoritePublisherIds = prepareArrayParam(props.favoritePublishers.items, null)
      const publisherIds = prepareArrayParam([props.favorites.publisherId], null)
      const categoryIds = prepareArrayParam([props.favorites.categoryId], null)

      return {
        variables: {
          ...defaultVariables,
          type: 'favorites',
          publisherIds: publisherIds || favoritePublisherIds,
          categoryIds
        }
      }
    }
  })(FavoritesTimeline)
}
