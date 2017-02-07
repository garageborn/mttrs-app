import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import HeaderStripColor from '../components/HeaderStripColor'
import CategoryColorList from '../components/CategoryColorList'
import withQuery from './CategoryColorsListContainer.gql'
import { ErrorActions } from '../actions/index'

class HeaderBottomColorContainer extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.error) this.props.dispatch((ErrorActions.showErrorDisclaimer()))
  }

  render () {
    let { ErrorReducer, uiReducer, type, data, params } = this.props

    if (uiReducer.menu.isOpen) return false

    if (type === 'publisher') return <HeaderStripColor type={type} />

    if (ErrorReducer.hasError) return null

    return <CategoryColorList type={type} data={data} params={params} />
  }
}

HeaderBottomColorContainer.propTypes = {
  dispatch: PropTypes.func,
  type: PropTypes.string,
  data: PropTypes.object.isRequired,
  params: PropTypes.object,
  uiReducer: PropTypes.object.isRequired,
  ErrorReducer: PropTypes.object
}

let mapStateToProps = state => {
  return {
    uiReducer: state.uiReducer,
    ErrorReducer: state.ErrorReducer
  }
}

const HeaderBottomColorContainerWithData = withQuery(HeaderBottomColorContainer)
export default connect(mapStateToProps)(HeaderBottomColorContainerWithData)
