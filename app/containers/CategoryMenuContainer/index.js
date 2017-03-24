import React, { Component, PropTypes } from 'react'
import { InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import CategoryMenu from '../../components/CategoryMenu'
import ApolloError from '../../components/ApolloError'
import { NavigationActions, MenuActions } from '../../actions/index'

class CategoryMenuContainer extends Component {
  constructor (props) {
    super(props)

    this.openHome = this.openHome.bind(this)
    this.openCategory = this.openCategory.bind(this)
  }

  renderError () {
    return <ApolloError skinType='dark' data={this.props.data} />
  }

  render () {
    if (this.props.data.error) return this.renderError()
    return (
      <CategoryMenu
        openHome={this.openHome}
        openCategory={this.openCategory}
        data={this.props.data}
      />
    )
  }

  openHome () {
    this.props.dispatch(MenuActions.closeMenu())
    InteractionManager.runAfterInteractions(() => {
      this.props.dispatch(NavigationActions.home())
    })
  }

  openCategory (category) {
    this.props.dispatch(MenuActions.closeMenu())
    InteractionManager.runAfterInteractions(() => {
      this.props.dispatch(NavigationActions.selectCategory(category))
    })
  }
}

CategoryMenuContainer.propTypes = {
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

const CategoryMenuContainerWithData = withQuery(CategoryMenuContainer)
export default connect()(CategoryMenuContainerWithData)
