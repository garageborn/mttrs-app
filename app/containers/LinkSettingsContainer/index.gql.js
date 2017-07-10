import { PixelRatio } from 'react-native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const Query = gql`
  query($dpr: Int, $slug: String!) {
    link(slug: $slug) {
      id
      title
      amp_url
      url
      slug
      publisher {
        id
        name
        icon(dpr: $dpr) { small }
      }
    }
  }
`

export default function (LinkSettingsContainer) {
  return graphql(Query, {
    options (props) {
      return {
        variables: {
          slug: props.slug,
          dpr: PixelRatio.get()
        }
      }
    }
  })(LinkSettingsContainer)
}
