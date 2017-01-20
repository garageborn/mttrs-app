import React, { PropTypes } from 'react'
import Header from '../components/Header'

const CategoryHeaderContainer = ({ toggleMenu, category, params }) => {
  return (
    <Header
      title={category.name}
      toggleMenu={toggleMenu}
      params={params}
      type='category'
    />
  )
}

CategoryHeaderContainer.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  params: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func.isRequired
}

export default CategoryHeaderContainer
