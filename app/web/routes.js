import React from 'react'
import StoryList from 'mttrs/app/web/containers/StoryList'
import {Route} from 'react-router'

module.exports = [
  <Route path='/' component={StoryList} filter='today'/>,
  <Route path='/yesterday' component={StoryList} filter='yesterday'/>,
  <Route path='/last-week' component={StoryList} filter='last_week'/>,
  <Route path='/last-month' component={StoryList} filter='last_month'/>,
  <Route path='/:slug' component={StoryList} filter='today'/>,
  <Route path='/:slug/yesterday' component={StoryList} filter='yesterday'/>,
  <Route path='/:slug/last-week' component={StoryList} filter='last_week'/>,
  <Route path='/:slug/last-month' component={StoryList} filter='last_month'/>
]
