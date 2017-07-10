import { PixelRatio } from 'react-native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const Query = gql`
  query($dpr: Int, $slug: String!) {
    link(slug: $slug) {
      id
      title
      url
      slug
      image(dpr: $dpr) {
        thumb
      }
      story { id }
      publisher {
        id
        name
        display_name
        icon(dpr: $dpr) { small }
        slug
        restrict_content
      }
    }
  }
`

export default function (LinkNotificationContainer) {
  return graphql(Query, {
    options (props) {
      const { slug } = props.payload.additionalData.model

      return {
        variables: {
          slug,
          dpr: PixelRatio.get()
        }
      }
    }
  })(LinkNotificationContainer)
}
