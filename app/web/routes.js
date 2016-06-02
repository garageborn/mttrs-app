import React from 'react'
import Main from 'mttrs/app/web/containers/Main'
import {Route} from 'react-router'

module.exports = [
  <Route path='/' component={Main} filter='today'/>,
  <Route path='/yesterday' component={Main} filter='yesterday'/>,
  <Route path='/last-week' component={Main} filter='last_week'/>,
  <Route path='/last-month' component={Main} filter='last_month'/>,
  <Route path='/:slug' component={Main} filter='today'/>,
  <Route path='/:slug/yesterday' component={Main} filter='yesterday'/>,
  <Route path='/:slug/last-week' component={Main} filter='last_week'/>,
  <Route path='/:slug/last-month' component={Main} filter='last_month'/>
]
