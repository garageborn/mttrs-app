import React, { Component, PropTypes } from 'react'
import { InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from '@exponent/ex-navigation'
import withQuery from './index.gql'
import { AnalyticsActions, NavigationActions } from '../../actions/index'
import Timeline from '../Timeline'
import BackButtonBehaviour from '../../common/utils/BackButtonBehaviour'

class CategoryTimeline extends Component {
  constructor () {
    super()
    this.goHome = this.goHome.bind(this)
    this.state = { renderPlaceholderOnly: true }
  }

  componentWillMount () {
    this.analyticsTrack()
  }

  componentDidMount () {
    this.renderPlaceholderInteracion = InteractionManager.runAfterInteractions(() => {
      this.setState({ renderPlaceholderOnly: false })
    })
  }

  componentWillReceiveProps (nextProps, nextState) {
    console.log(this.props.model.slug, 'componentWillReceiveProps', { isRenderable: this.isRenderable(nextProps) })

    if (this.renderPlaceholderInteracion) this.renderPlaceholderInteracion.cancel()

    if (this.isRenderable(nextProps)) {
      this.setState({ renderPlaceholderOnly: false })
    } else {
      this.renderPlaceholderInteracion = InteractionManager.runAfterInteractions(() => {
        this.setState({ renderPlaceholderOnly: true })
      })
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log(nextProps.model.slug, 'shouldComponentUpdate', {
      isRenderable: this.isRenderable(nextProps),
      renderPlaceholderOnlyChanged: this.state.renderPlaceholderOnly !== nextState.renderPlaceholderOnly
    })

    return this.state.renderPlaceholderOnly !== nextState.renderPlaceholderOnly
  }

  componentWillUnmount () {
    if (this.renderPlaceholderInteracion) this.renderPlaceholderInteracion.cancel()
  }

  analyticsTrack () {
    const { dispatch, model } = this.props
    dispatch(AnalyticsActions.trackScreen(`/${model.slug}`))
  }

  goHome () {
    return Promise.resolve(this.props.dispatch(NavigationActions.home()))
  }

  render () {
    return (
      <BackButtonBehaviour isFocused={this.isFocused} onBackButtonPress={this.goHome}>
        { this.renderTimeline() }
      </BackButtonBehaviour>
    )
  }

  renderTimeline () {
    console.log(this.props.model.slug, 'renderTimeline', { renderPlaceholderOnly: this.state.renderPlaceholderOnly })
    if (this.state.renderPlaceholderOnly) return null
    return <Timeline data={this.props.data} />
  }

  isCurrentTimeline (props) {
    return this.currentRouteOnArray(props) === props.navigationState.index
  }

  isNextTimeline (props) {
    return this.currentRouteOnArray(props) === props.navigationState.index + 1
  }

  isPreviousTimeline (props) {
    return this.currentRouteOnArray(props) === props.navigationState.index - 1
  }

  isRenderable (props) {
    return this.isCurrentTimeline(props) || this.isNextTimeline(props) || this.isPreviousTimeline(props)
  }

  currentRouteOnArray (props) {
    let currentRouteOnArray = props.navigationState.routes.find((item) =>
      item.model === props.model
    )
    return JSON.parse(currentRouteOnArray.key)
  }

  get isFocused () {
    return this.props.isActiveRoute && this.isCurrentTimeline(this.props) && !this.props.uiReducer.menu.isOpen
  }
}

CategoryTimeline.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.any,
  navigationState: PropTypes.shape({
    index: PropTypes.number.isRequired,
    routes: PropTypes.array.isRequired
  }).isRequired,
  isActiveRoute: PropTypes.bool,
  uiReducer: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const currentRoute = ownProps.navigator.getCurrentRoute()
  return {
    isActiveRoute: currentRoute.routeName === 'timeline',
    uiReducer: state.uiReducer
  }
}

const CategoryTimelineWithData = withQuery(CategoryTimeline)
const CategoryWithRedux = connect(mapStateToProps)(CategoryTimelineWithData)
export default withNavigation(CategoryWithRedux)
