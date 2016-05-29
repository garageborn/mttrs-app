import React from 'react'
import ReactDOM from 'react-dom'
import App from 'mttrs/app/web/containers/App'
import configureStore from 'mttrs/app/web/store/configureStore'
import DevTools from 'mttrs/app/web/utils/DevTools'

const store = configureStore(window.__INITIAL_STATE__)

ReactDOM.render(<App store={store}/>, document.getElementById('mttrs'))

if (__DEV__) {
  ReactDOM.render(<DevTools store={store}/>, document.getElementById('dev-tools'))
}
