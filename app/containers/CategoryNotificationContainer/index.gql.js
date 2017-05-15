import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const Query = gql`
  query($slug: String!) {
    category(slug: $slug) {
      id
      name
      slug
    }
  }
`

export default function (CategoryNotificationContainer) {
  return graphql(Query, {
    options (props) {
      const { slug } = props.payload.additionalData.model

      return {
        variables: { slug }
      }
    }
  })(CategoryNotificationContainer)
}
