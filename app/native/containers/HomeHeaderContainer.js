import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import Header from '../components/Header'

class HomeHeaderContainer extends Component {
  constructor(props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  render() {
    return (
      <Header openMenu={this.toggleMenu} />
    )
  }

  toggleMenu() {
    Actions.menu()
  }
}

export default HomeHeaderContainer
