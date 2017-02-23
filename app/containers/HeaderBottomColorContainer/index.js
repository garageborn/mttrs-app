import React, { Component, PropTypes } from 'react'
import { InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import HeaderStripColor from '../../components/HeaderStripColor'
import CategoryColorList from '../../components/CategoryColorList'
import withQuery from './index.gql'
class HeaderBottomColorContainer extends Component {
  constructor () {
    super()
    this.state = { renderPlaceholderOnly: true }
  }

  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ renderPlaceholderOnly: false })
    })
  }

  componentWillReceiveProps (nextProps, nextState) {
    if (this.props.uiReducer.menu.isOpen === nextProps.uiReducer.menu.isOpen) return

    if (nextProps.uiReducer.menu.isOpen === false) {
      this.setState({ renderPlaceholderOnly: true })
      InteractionManager.runAfterInteractions(() => {
        this.setState({ renderPlaceholderOnly: false })
      })
    }
  }

  render () {
    if (this.state.renderPlaceholderOnly || this.props.uiReducer.menu.isOpen) return null
    if (this.props.type === 'publisher') {
      return this.renderStripColor()
    } else {
      return this.renderCategoryColorList()
    }
  }

  renderStripColor () {
    return <HeaderStripColor type={this.props.type} />
  }

  renderCategoryColorList () {
    const { type, data, params } = this.props
    if (data.error) return null
    return <CategoryColorList type={type} data={data} params={params} />
  }
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
