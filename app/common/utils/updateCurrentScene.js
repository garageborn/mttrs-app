import _result from 'lodash/result'
import _noop from 'lodash/noop'
import { store } from '../../../index'

class UpdateCurrentScene {
  constructor (component, scene) {
    this.component = component
    this.scene = scene
    this.pendingUpdate = false
    this.storeListener = this.storeListener.bind(this)

    if (!this.component.componentWillMount) this.component.componentWillMount = _noop
    if (!this.component.shouldComponentUpdate) this.component.shouldComponentUpdate = () => true
    if (!this.component.componentWillUnmount) this.component.componentWillUnmount = _noop

    this.originalComponentWillMount = this.component.componentWillMount.bind(this.component)
    this.originalShouldComponentUpdate = this.component.shouldComponentUpdate.bind(this.component)
    this.originalComponentWillUnmount = this.component.componentWillUnmount.bind(this.component)

    this.component.componentWillMount = this.componentWillMount.bind(this)
    this.component.componentWillUnmount = this.componentWillUnmount.bind(this)
    this.component.shouldComponentUpdate = this.shouldComponentUpdate.bind(this)
  }

  componentWillMount () {
    this.unsubscribeStoreListener = store.subscribe(this.storeListener)
    return this.originalComponentWillMount()
  }

  componentWillUnmount () {
    _result(this, 'unsubscribeStoreListener()')
    return this.originalComponentWillUnmount()
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.isCurrentRoute && this.pendingUpdate) {
      this.pendingUpdate = false
      return true
    }

    const shouldUpdate = this.originalShouldComponentUpdate(nextProps, nextState) || false
    if (!shouldUpdate) return false

    if (this.isCurrentRoute) {
      this.pendingUpdate = false
      return true
    } else {
      this.pendingUpdate = true
      return false
    }
  }

  storeListener () {
    if (!this.isCurrentRoute || !this.pendingUpdate) return
    this.pendingUpdate = false
    this.component.forceUpdate()
  }

  get isCurrentRoute () {
    return this.currentRoute.routeName === this.scene
  }

  get currentRoute () {
    return this.state.RouterReducer.current
  }

  get state () {
    return store.getState()
  }
}

export default function (component, scene) {
  return new UpdateCurrentScene(component, scene)
}
