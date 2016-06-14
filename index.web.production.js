import React from 'react'
import ReactDOM from 'react-dom'
import App from 'mttrs/app/web/containers/App'
import configureStore from 'mttrs/app/web/config/configureStore.production'

const store = configureStore(window.__INITIAL_STATE__)
ReactDOM.render(<App store={store}/>, document.getElementById('mttrs'))
