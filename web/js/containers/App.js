import React from 'react'
import {Provider} from 'react-redux'
import configureStore from 'store/configureStore'
import {renderDevTools} from 'utils/devTools'
import {Router, Route, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import StoryList from 'containers/StoryList'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

export default React.createClass({
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router history={history}>
            <Route path='/' component={StoryList} filter='today'/>
            <Route path='/yesterday' component={StoryList} filter='yesterday'/>
            <Route path='/last-week' component={StoryList} filter='last_week'/>
            <Route path='/last-month' component={StoryList} filter='last_month'/>
            {/*<Route path='/categories/:slug' component={StoryList}/>*/}
          </Router>
        </Provider>

        {renderDevTools(store)}
      </div>
    )
  }
})
