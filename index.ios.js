import React from 'react'
import { AppRegistry } from 'react-native'
import Root from './app/native/containers/Root'
import configureStore from './app/native/config/configureStore'

const store = configureStore()
const mttrs = () => <Root store={store}/>
AppRegistry.registerComponent('mttrs', () => mttrs)
