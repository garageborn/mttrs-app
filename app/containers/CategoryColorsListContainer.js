import React, { PropTypes } from 'react'
import CategoryColorList from '../components/CategoryColorList'
import withQuery from './CategoryColorsListContainer.gql'

const CategoryColorsListContainer = ({data}) => {
  return <CategoryColorList data={data} />
}

CategoryColorsListContainer.propTypes = {
  data: PropTypes.object.isRequired
}

export default withQuery(CategoryColorsListContainer)
