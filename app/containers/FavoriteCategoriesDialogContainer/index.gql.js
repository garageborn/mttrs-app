import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import prepareArrayParam from '../../common/utils/ArrayParam'

const Query = gql`
query($publisherIds: [Int]) {
  categories(with_stories: true, ordered: true, publisher_ids: $publisherIds) {
    color
    id
    name
    slug
  }
}
`
export default function (FavoriteCategoriesDialog) {
  return graphql(Query, {
    skip: (props) => {
      return !props.favoritePublishers.isLoaded
    },
    options (props) {
      const favoritePublishers = props.favoritePublishers.items
      const selectedPublisher = props.favorites.publisherId
      const publisherIds = selectedPublisher ? [selectedPublisher] : favoritePublishers
      return {
        variables: {
          publisherIds: prepareArrayParam(publisherIds, null)
        }
      }
    }
  })(FavoriteCategoriesDialog)
}
