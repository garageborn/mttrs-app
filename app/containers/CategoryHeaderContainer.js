import React, { PropTypes } from 'react'
import Header from '../components/Header'

const CategoryHeaderContainer = ({ toggleMenu, category }) => {
  return (
    <Header
      title={category.name}
      toggleMenu={toggleMenu}
    />
  )
}

CategoryHeaderContainer.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  toggleMenu: PropTypes.func.isRequired
}

export default CategoryHeaderContainer
