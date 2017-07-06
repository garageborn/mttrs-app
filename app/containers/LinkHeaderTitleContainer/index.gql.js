import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const Query = gql`
  query($slug: String!) {
    link(slug: $slug) {
      id
      title
      publisher {
        id
        name
        icon { xsmall }
      }
    }
  }
`

export default function (LinkHeaderTitleContainer) {
  return graphql(Query, {
    options (props) {
      return {
        variables: { slug: props.navigation.state.params.slug }
      }
    }
  })(LinkHeaderTitleContainer)
}
