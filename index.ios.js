import React from 'react'
import { AppRegistry } from 'react-native'
import App from './app/native/containers/App'
import configureStore from './app/native/config/configureStore'

const store = configureStore()
const mttrs = () => <App store={store}/>
AppRegistry.registerComponent('mttrs', () => mttrs)
