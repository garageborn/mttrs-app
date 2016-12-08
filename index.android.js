import React from 'react'
import { AppRegistry } from 'react-native'
import Root from './app/containers/Root'
import configureStore from './app/config/configureStore'

const store = configureStore()
const mttrs = () => <Root store={store}/>
AppRegistry.registerComponent('mttrs', () => mttrs)
