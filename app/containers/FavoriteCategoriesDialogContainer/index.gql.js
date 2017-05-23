import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Query = gql`
query($publishersIds: [Int]) {
  categories(with_stories: true, ordered: true, publisher_ids: $publishersIds) {
    color
    id
    name
    slug
  }
}
`
export default function (FavoriteCategoriesDialog) {
  return graphql(Query, {
    skip: (props) => {
      return !props.favorites.isLoaded
    },
    options (props) {
      const { selected, items } = props.favorites
      const publishersIds = selected ? [selected] : items
      return { variables: { publishersIds } }
    }
  })(FavoriteCategoriesDialog)
}
