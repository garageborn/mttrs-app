import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const Query = gql`
  query($slug: String!) {
    link(slug: $slug) {
      id
      title
      url
      slug
      image_source_url
      story { id }
      publisher { id name display_name icon_id slug restrict_content }
    }
  }
`

export default function (LinkNotificationContainer) {
  return graphql(Query, {
    options (props) {
      const { slug } = props.payload.additionalData.model

      return {
        variables: { slug }
      }
    }
  })(LinkNotificationContainer)
}
