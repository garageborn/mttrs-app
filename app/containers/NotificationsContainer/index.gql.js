import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const Query = gql`
  query($id: ID!, $slug: String!) {
    link(id: $id, slug: $slug)
  }
`

export default function (NotificationsContainer) {
  return graphql(Query, {
    options (props) {
      return {
        variables: {
          id: '',
          slug: ''
        }
      }
    }})(NotificationsContainer)
}
