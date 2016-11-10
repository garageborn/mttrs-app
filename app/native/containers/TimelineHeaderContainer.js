import React, { Component, PropTypes } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { MenuActions } from '../actions/index'
import HomeHeaderContainer from './HomeHeaderContainer'
import CategoryHeaderContainer from './CategoryHeaderContainer'
import PublisherHeaderContainer from './PublisherHeaderContainer'
import MenuContainer from './MenuContainer'

class TimelineHeaderContainer extends Component {
  constructor(props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  render() {
    return (
      <View style={styles}>
        {this.renderHeader()}
      </View>
    )
  }

  renderHeader() {
    const { section } = this.props.params

    if (!section) return <HomeHeaderContainer toggleMenu={this.toggleMenu} />
    switch(section.name) {
      case 'category':
        return <CategoryHeaderContainer category={section.model} toggleMenu={this.toggleMenu} />
      case 'publisher':
        return <PublisherHeaderContainer publisher={section.model} toggleMenu={this.toggleMenu} />
      default:
        return <HomeHeaderContainer toggleMenu={this.toggleMenu} />
    }
  }

  toggleMenu() {
    const { menu } = this.props.uiReducer
    if (menu.isOpen) {
      return this.props.dispatch(MenuActions.retractMenu())
    } else {
      return this.props.dispatch(MenuActions.openMenu())
    }
  }
}

TimelineHeaderContainer.propTypes = {
  params: PropTypes.object.isRequired,
  uiReducer: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return { uiReducer: state.uiReducer }
}

const styles = StyleSheet.create({
  zIndex: 1
})

export default connect(mapStateToProps)(TimelineHeaderContainer)
