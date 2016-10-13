import React, { Component, PropTypes } from 'react'
import { View, Animated, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { MenuActions } from '../actions/index'
import HomeHeaderContainer from './HomeHeaderContainer'
import CategoryHeaderContainer from './CategoryHeaderContainer'
import PublisherHeaderContainer from './PublisherHeaderContainer'
import MenuContainer from './MenuContainer'

const { height } = Dimensions.get('window')

class TimelineHeaderContainer extends Component {
  constructor(props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.state = {
      menuPositionY: new Animated.Value(-height)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uiReducer.menu.isOpen) {
      this.animate('in')
    }
  }

  animate(type) {
    const value = type === 'in' ? 0 : -height;
    const callback = type === 'out' ? this.closeMenu : null
    return (
      Animated.timing(
        this.state.menuPositionY,
        {
          toValue: value,
          duration: 330
        }
      ).start(callback)
    )
  }

  render() {
    return (
      <View>
        { this.renderHeader() }
        <Animated.View style={{transform: [{translateY: this.state.menuPositionY}]}}>
          { this.renderMenu() }
        </Animated.View>
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
    const { params, uiReducer } = this.props
    if (uiReducer.menu.isOpen) return <MenuContainer params={params}/>
  }

  closeMenu() {
    this.props.dispatch(MenuActions.closeMenu())
  }

  toggleMenu() {
    const { menu } = this.props.uiReducer
    return menu.isOpen ? this.animate('out') : this.props.dispatch(MenuActions.openMenu())
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
