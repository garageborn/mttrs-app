import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const Query = gql`
  query($id: ID!, $publisherSlug: String) {
    story(id: $id) {
      main_link(publisher_slug: $publisherSlug) {
        title
        url
        amp_url
        slug
        total_social
        publisher { name display_name slug icon_id restrict_content }
      }
      social_counter {
        facebook
        google_plus
        linkedin
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
          id: props.story.id,
          publisherSlug: props.publisherSlug
        }
      }
    }
  })(SocialCountModalContainer)
}
