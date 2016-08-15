import React, {Component, PropTypes} from 'react'
import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import Routes from '../config/Routes'

class App extends Component {
  render() {
    const {store} = this.props
    const history = syncHistoryWithStore(browserHistory, store)

    return (
      <Provider store={store}>
        <Router history={history} routes={Routes.all(store)}/>
      </Provider>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
