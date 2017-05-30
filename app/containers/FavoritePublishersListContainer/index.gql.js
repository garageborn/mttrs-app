import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import prepareArrayParam from '../../common/utils/ArrayParam'

const Query = gql`
query($publisherIds: [Int]) {
  publishers(with_stories: true, order_by_name: true, with_ids: $publisherIds) {
    id
    display_name
    icon_id
    name
    slug
  }
}
`
export default function (FavoritePublishers) {
  return graphql(Query, {
    options (props) {
      const publisherIds = prepareArrayParam(props.publisherIds, null)
      return {
        variables: { publisherIds }
      }
    }
  })(FavoritePublishers)
}
