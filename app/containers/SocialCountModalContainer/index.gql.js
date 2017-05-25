import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import _result from 'lodash/result'

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
      const { story, renderOptions } = props
      return {
        variables: {
          id: story.id,
          publisherSlug: _result(renderOptions, 'publisherSlug')
        }
      }
    }
  })(SocialCountModalContainer)
}
