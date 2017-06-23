import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const Query = gql`
  query($slug: String!) {
    link(slug: $slug) {
      story {
        id
        links_count
      }
    }
  }
`

export default function (HeaderSwitchLinkContainer) {
  return graphql(Query, {
    options (props) {
      return {
        variables: { slug: props.slug }
      }
    }
  })(HeaderSwitchLinkContainer)
}
