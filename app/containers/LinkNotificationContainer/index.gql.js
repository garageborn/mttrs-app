import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const Query = gql`
  query($slug: String!) {
    link(slug: $slug) {
      title
      url
      slug
      image_source_url
      story { id }
      publisher { name display_name icon_id slug restrict_content }
    }
  }
`

export default function (LinkNotificationContainer) {
  return graphql(Query, {
    options (props) {
      return {
        variables: {
          slug: props.model.slug
        }
      }
    }
  })(LinkNotificationContainer)
}
