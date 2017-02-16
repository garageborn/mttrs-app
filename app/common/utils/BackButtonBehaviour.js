// ex-navigation AndroidBackButtonBehavior seems to ignore the isFocused prop
// because it tries to use the isFocused prop from context

import { Component, PropTypes } from 'react'
import { getBackButtonManager } from '@exponent/ex-navigation'

class BackButtonBehaviour extends Component {
  constructor () {
    super()
    this.state = { enabled: false }
  }

  componentDidMount () {
    if (this.props.isFocused) this.enable()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.isFocused === nextProps.isFocused) return

    if (nextProps.isFocused && !this.props.isFocused) {
      this.enable()
    } else if (!nextProps.isFocused && this.props.isFocused) {
      this.disable()
    }
  }

  componentWillUnmount () {
    this.disable()
  }

  render () {
    return this.props.children
  }

  enable () {
    if (this.state.enabled) return
    console.info('enable', this.props.name)

    this.buttonManager.pushListener(() => { return this.props.onBackButtonPress() })

    this.setState({ enabled: true, listenerIndex: this.listeners.length - 1 })
  }

  disable () {
    if (!this.state.enabled) return
    console.info('disable', this.props.name)

    let newListeners = [...this.listeners]
    newListeners.splice(this.state.listenerIndex, 1)
    console.log('listeners count before', this.props.name, this.listeners)
    this.buttonManager._setListeners(newListeners)
    console.log('listeners count after', this.props.name, this.listeners.length)

    if (this.listeners.length === 1) this.buttonManager.ensureGlobalListener()

    this.setState({ enabled: false })
  }

  get buttonManager () {
    return getBackButtonManager()
  }

  get listeners () {
    return this.buttonManager._listeners
  }
}

BackButtonBehaviour.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  onBackButtonPress: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default BackButtonBehaviour
