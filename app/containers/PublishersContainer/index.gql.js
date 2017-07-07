import { PixelRatio } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Query = gql`
query($dpr: Int) {
  publishers(with_stories: true, order_by_name: true) {
    id
    icon(dpr: $dpr) { small }
    name
    display_name
    slug
    today_stories_count
  }
}
`

export default function (PublishersContainer) {
  return graphql(Query, {
    options (props) {
      return {
        variables: {
          dpr: PixelRatio.get()
        }
      }
    }
  })(PublishersContainer)
}
