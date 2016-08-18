import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/web/containers/App'
import configureStore from './app/web/config/configureStore'
import DevTools from './app/web/utils/DevTools'

const store = configureStore(window.__INITIAL_STATE__)

ReactDOM.render(<App store={store}/>, document.getElementById('mttrs'))
ReactDOM.render(<DevTools store={store}/>, document.getElementById('dev-tools'))
