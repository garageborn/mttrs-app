import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { MenuActions } from '../actions/index'
import CategoryHeaderContainer from './CategoryHeaderContainer'
import PublisherHeaderContainer from './PublisherHeaderContainer'
import styles from '../styles/TimelineHeaderContainer'

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
    const { params, uiReducer } = this.props
    const { isOpen } = uiReducer.menu
    const { section } = params

    if (!section) return <CategoryHeaderContainer toggleMenu={this.toggleMenu} params={params} menuIsOpen={isOpen} />
    if (section.name === 'publisher') return <PublisherHeaderContainer publisher={section.model} toggleMenu={this.toggleMenu} params={params} menuIsOpen={isOpen} />
    return <CategoryHeaderContainer category={section.model} toggleMenu={this.toggleMenu} params={params} menuIsOpen={isOpen} />
  }

  toggleMenu () {
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
  uiReducer: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return { uiReducer: state.uiReducer }
}

export default connect(mapStateToProps)(TimelineHeaderContainer)
