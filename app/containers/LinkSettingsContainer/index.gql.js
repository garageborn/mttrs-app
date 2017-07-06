import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const Query = gql`
  query($slug: String!) {
    link(slug: $slug) {
      id
      title
      amp_url
      url
      slug
      publisher {
        id
        name
        icon { small }
      }
    }
  }
`

export default function (LinkSettingsContainer) {
  return graphql(Query, {
    options (props) {
      return {
        variables: { slug: props.slug }
      }
    }
  })(LinkSettingsContainer)
}
