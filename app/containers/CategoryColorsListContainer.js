import React, { PropTypes } from 'react'
import CategoryColorList from '../components/CategoryColorList'
import withQuery from './CategoryColorsListContainer.gql'

const CategoryColorsListContainer = ({ data, params }) => {
  return (
    <CategoryColorList data={data} params={params} />
  )
}

CategoryColorsListContainer.propTypes = {
  data: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
}

export default withQuery(CategoryColorsListContainer)
