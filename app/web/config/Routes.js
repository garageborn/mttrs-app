import React from 'react'
import Main from 'mttrs/app/web/containers/Main'
import {Route} from 'react-router'
import * as HeaderActions from 'mttrs/app/actions/HeaderActions'

class Routes {
  static fetchData({ dispatch }) {
    return [
      dispatch(HeaderActions.getCategories())
    ]
  }

  static all(store) {
    let categories = store.getState().HeaderReducers.categories
    return [
      ...Routes.defaultRoutes(),
      ...Routes.categoriesRoutes(categories)
    ]
  }

  static defaultRoutes() {
    return [
      <Route path='/' component={Main} />,
      <Route path='/last-week' component={Main} filter='last_week'/>,
      <Route path='/last-month' component={Main} filter='last_month'/>
    ]
  }

  static categoriesRoutes(categories) {
    return categories.map((category) => {
      return [
        <Route path={`/${category.slug}`} component={Main} categorySlug={category.slug}/>,
        <Route path={`/${category.slug}/last-week`} component={Main} filter='last_week' categorySlug={category.slug}/>,
        <Route path={`/${category.slug}/last-month`} component={Main} filter='last_month' categorySlug={category.slug}/>
      ]
    }).reduce(function(a, b) { return a.concat(b) }, [])
  }
}

export default Routes
