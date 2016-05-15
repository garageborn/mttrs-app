import React from 'react'
import {Provider} from 'react-redux'
import configureStore from 'store/configureStore'
import {renderDevTools} from 'utils/devTools'
import {Router, Route, browserHistory} from 'react-router'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import Home from 'containers/Home'
import Category from 'containers/Category'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

export default React.createClass({
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router history={history}>
            <Route path='/' component={Home}/>
            <Route path='/categories/:slug' component={Category}/>
          </Router>
        </Provider>

        {renderDevTools(store)}
      </div>
    )
  }
})
