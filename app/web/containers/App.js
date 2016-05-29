import React from 'react'
import {Provider} from 'react-redux'
import configureStore from 'mttrs/app/web/store/configureStore'
import {Router, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import routes from 'mttrs/app/web/routes'
import {renderDevTools} from 'mttrs/app/web/utils/devTools'

const store = configureStore(window.__INITIAL_STATE__)
const history = syncHistoryWithStore(browserHistory, store)

export default React.createClass({
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router history={history} routes={routes}/>
        </Provider>
        {renderDevTools(store)}
      </div>
    )
  }
})
