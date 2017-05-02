import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const Query = gql`
  query($id: ID!) {
    story(id: $id) {
      social_counter {
        facebook
        google_plus
        twitter
        pinterest
        total
      }
      other_links {
        total_social
      }
    }
  }
`

export default function (SocialCountModalContainer) {
  return graphql(Query, {
    options (props) {
      return {
        variables: {
          id: props.story.id
        }
      }
    }
  })(SocialCountModalContainer)
}
