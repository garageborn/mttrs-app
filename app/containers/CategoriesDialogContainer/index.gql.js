import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import prepareArrayParam from '../../common/utils/ArrayParam'

const Query = gql`
query($publisherIds: [Int]) {
  categories(with_stories: true, ordered: true, publisher_ids: $publisherIds) {
    id
    color
    name
    slug
  }
}
`
export default function (FavoriteCategoriesDialog) {
  return graphql(Query, {
    options (props) {
      const publisherIds = prepareArrayParam(props.publisherIds, null)
      return {
        variables: { publisherIds }
      }
    }
  })(FavoriteCategoriesDialog)
}
