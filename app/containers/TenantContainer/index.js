import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavigationProvider, StackNavigation } from '@exponent/ex-navigation'
import { locale } from '../../config/IntlProvider'
import { TenantActions } from '../../actions/index'
import Router from '../../config/Router'

class TenantContainer extends Component {
  componentWillMount () {
    this.props.dispatch(TenantActions.getCurrentTenant(locale))
  }

  render () {
    const { tenant, navigationContext } = this.props

    if (!tenant.isLoaded) return null

    return (
      <NavigationProvider context={navigationContext}>
        <StackNavigation initialRoute={Router.getRoute('timeline')} />
      </NavigationProvider>
    )
  }
}

TenantContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigationContext: PropTypes.object.isRequired,
  tenant: PropTypes.shape({
    isLoaded: PropTypes.bool.isRequired
  }).isRequired
}

const mapStateToProps = state => ({
  tenant: state.TenantReducer
})

export default connect(mapStateToProps)(TenantContainer)
