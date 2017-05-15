import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const Query = gql`
  query($slug: String!) {
    publisher(slug: $slug) {
      name
      display_name
      icon_id
      slug
    }
  }
`

export default function (PublisherNotificationContainer) {
  return graphql(Query, {
    options (props) {
      const { slug } = props.payload.additionalData.model

      return {
        variables: { slug }
      }
    }
  })(PublisherNotificationContainer)
}
