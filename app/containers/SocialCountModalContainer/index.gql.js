import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const Query = gql`
  query($id: ID!, $publisherSlug: String) {
    story(id: $id) {
      social_counter {
        facebook
        google_plus
        twitter
        pinterest
        linkedin
        total
      }
      other_links {
        total_social
      }
    }
  }
`

export default function (StoryLinksContainer) {
  return graphql(Query, {
    options (props) {
      return {
        variables: {
          id: props.story.id
        }
      }
    }
  })(StoryLinksContainer)
}
