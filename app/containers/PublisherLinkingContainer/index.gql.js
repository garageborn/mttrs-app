import { PixelRatio } from 'react-native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const Query = gql`
  query($dpr: Int, $slug: String!) {
    publisher(slug: $slug) {
      id
      name
      display_name
      icon(dpr: $dpr) { small }
      slug
    }
  }
`

export default function (PublisherNotificationContainer) {
  return graphql(Query, {
    options (props) {
      const { slug } = props

      return {
        variables: {
          dpr: PixelRatio.get(),
          slug
        }
      }
    }
  })(PublisherNotificationContainer)
}
