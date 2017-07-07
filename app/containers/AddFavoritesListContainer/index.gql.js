import { PixelRatio } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Query = gql`
query($dpr: Int) {
  publishers(with_stories: true, order_by_name: true) {
    id
    display_name
    icon(dpr: $dpr) { medium }
    name
    slug
  }
}
`

export default function (AddFavoritesContainer) {
  return graphql(Query, {
    options (props) {
      return {
        variables: {
          dpr: PixelRatio.get()
        }
      }
    }
  })(AddFavoritesContainer)
}
