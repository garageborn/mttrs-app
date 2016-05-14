import React from 'react'
import {Provider} from 'react-redux'
import configureStore from 'store/configureStore'
import Home from 'containers/Home'
import {renderDevTools} from 'utils/devTools'

const store = configureStore()

export default React.createClass({
  render() {
    return (
      <div>
        <Provider store={store}>
          <Home />
        </Provider>

        {renderDevTools(store)}
      </div>
    )
  }
})
