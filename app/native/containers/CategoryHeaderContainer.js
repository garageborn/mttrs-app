import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Header from '../components/Header'

class CategoryHeaderContainer extends Component {
  constructor(props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  render() {
    const { name } = this.props.currentCategory
    return (
      <Header openMenu={this.toggleMenu} title={name} />
    )
  }

  toggleMenu() {
    Actions.menu()
  }
}

let mapStateToProps = (state) => {
  return {
    currentCategory: state.CurrentCategoryReducer.category
  }
}
export default connect(mapStateToProps)(CategoryHeaderContainer)
