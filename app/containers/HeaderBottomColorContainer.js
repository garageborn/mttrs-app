import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import HeaderStripColor from '../components/HeaderStripColor'
import CategoryColorList from '../components/CategoryColorList'
import withQuery from './CategoryColorsListContainer.gql'

const HeaderBottomColorContainer = ({uiReducer, type, data, params}) => {
  if (uiReducer.menu.isOpen) return false

  if (type === 'publisher') return <HeaderStripColor type={type} />

  if (data.error) return null

  return <CategoryColorList type={type} data={data} params={params} />
}

HeaderBottomColorContainer.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object.isRequired,
  params: PropTypes.object,
  uiReducer: PropTypes.object.isRequired
}

let mapStateToProps = state => {
  return {
    uiReducer: state.uiReducer
  }
}

const HeaderBottomColorContainerWithData = withQuery(HeaderBottomColorContainer)
export default connect(mapStateToProps)(HeaderBottomColorContainerWithData)
