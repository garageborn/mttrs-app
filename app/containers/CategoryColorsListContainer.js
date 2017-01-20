import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CategoryColorList from '../components/CategoryColorList'
import withQuery from './CategoryColorsListContainer.gql'

const CategoryColorsListContainer = ({ data, params, uiReducer }) => {
  if (uiReducer.menu.isOpen) return false
  return (
    <CategoryColorList data={data} params={params} />
  )
}

CategoryColorsListContainer.propTypes = {
  data: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  uiReducer: PropTypes.object.isRequired
}

let mapStateToProps = (state) => {
  return {
    uiReducer: state.uiReducer
  }
}

const CategoryColorsListContainerWithData = withQuery(CategoryColorsListContainer)
export default connect(mapStateToProps)(CategoryColorsListContainerWithData)
