import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Mutation = gql`
  mutation createLinkAccess($slug: String!) {
    createLinkAccess(input: { slug: $slug }) {
      link { url }
    }
  }
`

const Query = gql`
  query($slug: String!) {
    link(slug: $slug) {
      id
      title
      url
      amp_url
      publisher {
        id
        name
        icon_id
      }
      category {
        id
        color
      }
      story {
        id
      }
    }
  }
`

export default function (Link) {
  return graphql(Mutation, {
    props: ({mutate, ownProps}) => ({
      createLinkAccess: () => {
        return mutate({ variables: { slug: ownProps.navigation.state.params.slug } })
      }
    })
  })(
    graphql(Query, {
      options (props) {
        return { variables: { slug: props.navigation.state.params.slug } }
      }
    })(Link)
  )
}
