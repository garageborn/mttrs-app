import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const Query = gql`
  query($id: ID!, $publisherSlug: String) {
    story(id: $id) {
      id
      main_link(publisher_slug: $publisherSlug) {
        title
        url
        amp_url
        slug
        total_social
        publisher { name display_name slug icon_id restrict_content }
      }
      other_links(publisher_slug: $publisherSlug, popular: true) {
        title
        url
        amp_url
        slug
        total_social
        publisher { name display_name slug icon_id restrict_content }
      }
    }
  }
`

export default function (StoryLinksContainer) {
  return graphql(Query, {
    options (props) {
      return {
        variables: {
          id: props.story.id,
          publisherSlug: props.publisherSlug
        }
      }
    }
  })(StoryLinksContainer)
}