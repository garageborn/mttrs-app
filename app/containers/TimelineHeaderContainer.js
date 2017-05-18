import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { MenuActions } from '../actions/index'
import CategoryHeaderContainer from './CategoryHeaderContainer'
import PublisherHeaderContainer from './PublisherHeaderContainer'
import styles from '../styles/TimelineHeaderContainer'
import _result from 'lodash/result'

class TimelineHeaderContainer extends Component {
  constructor (props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
      </View>
    )
  }

  renderHeader () {
    const section = _result(this.props.params, 'section')

    if (!section) return this.renderHome()
    if (section.name === 'publisher') return this.renderPublisher()

    return this.renderCategory()
  }

  renderHome () {
    let params = { section: { name: 'home' } }
    return (
      <CategoryHeaderContainer
        toggleMenu={this.toggleMenu}
        params={params}
        menuIsOpen={this.props.uiReducer.menu.isOpen}
      />
    )
  }

  renderPublisher () {
    return (
      <PublisherHeaderContainer
        publisher={this.props.params.section.model}
        toggleMenu={this.toggleMenu}
        params={this.props.params}
        menuIsOpen={this.props.uiReducer.menu.isOpen}
      />
    )
  }

  renderCategory () {
    return (
      <CategoryHeaderContainer
        category={this.props.params.section.model}
        toggleMenu={this.toggleMenu}
        params={this.props.params}
        menuIsOpen={this.props.uiReducer.menu.isOpen}
      />
    )
  }

  toggleMenu () {
    const { menu } = this.props.uiReducer
    if (menu.isOpen) {
      return this.props.dispatch(MenuActions.closeMenu())
    } else {
      return this.props.dispatch(MenuActions.openMenu())
    }
  }
}

TimelineHeaderContainer.propTypes = {
  params: PropTypes.object.isRequired,
  uiReducer: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    uiReducer: state.uiReducer,
    nav: state.nav
  }
}

export default connect(mapStateToProps)(TimelineHeaderContainer)
