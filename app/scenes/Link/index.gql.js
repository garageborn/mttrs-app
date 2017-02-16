import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Mutation = gql`
  mutation createLinkAccess($slug: String!) {
    createLinkAccess(input: { slug: $slug }) {
      link { url }
    }
  }
`

export default function (Link) {
  return graphql(Mutation, {
    props: ({mutate, ownProps}) => ({
      createLinkAccess: () => {
        return mutate({ variables: { slug: ownProps.route.params.link.slug } })
      }
    })
  })(Link)
}
