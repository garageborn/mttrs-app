import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Mutation = gql`
  mutation createPublisherSuggestion($name: String!) {
    createPublisherSuggestion(input: { name: $name }) {
      publisher_suggestion { name }
    }
  }

`

export default function (PublisherMenuSuggestionContainer) {
  return graphql(Mutation, {
    props: ({mutate}) => ({
      createPublisherSuggestion: (publisherName) => {
        return mutate({ variables: { name: publisherName } })
      }
    })
  })(PublisherMenuSuggestionContainer)
}
