import { PixelRatio } from 'react-native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const Query = gql`
  query($dpr: Int, $slug: String!) {
    link(slug: $slug) {
      id
      title
      publisher {
        id
        name
        icon(dpr: $dpr) { xsmall }
      }
    }
  }
`

export default function (LinkHeaderTitleContainer) {
  return graphql(Query, {
    options (props) {
      return {
        variables: {
          slug: props.navigation.state.params.slug,
          dpr: PixelRatio.get()
        }
      }
    }
  })(LinkHeaderTitleContainer)
}
