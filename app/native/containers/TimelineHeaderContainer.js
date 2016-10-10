import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
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
      <View>
        { this.renderHeader() }
        { this.renderMenu() }
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

  renderMenu() {
    const { params } = this.props
    return <MenuContainer params={params}/>
  }

  toggleMenu() {
    this.props.dispatch(MenuActions.toggleMenu())
  }
}

TimelineHeaderContainer.propTypes = {
  params: PropTypes.object.isRequired,
  uiReducer: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return { uiReducer: state.uiReducer }
}

export default connect(mapStateToProps)(TimelineHeaderContainer)
