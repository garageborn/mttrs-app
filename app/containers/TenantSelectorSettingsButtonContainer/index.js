import React, { PureComponent, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { NavigationActions } from '../../actions/index'
import Touchable from '../../components/Touchable'
import SettingsItem from '../../components/SettingsItem'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import { COUNTRIES } from '../../constants/Countries'

class TenantSelectorSettingsButtonContainer extends PureComponent {
  constructor () {
    super()
    this.onPress = this.onPress.bind(this)
  }

  onPress () {
    this.props.dispatch(NavigationActions.tenantSelector())
  }

  render () {
    return (
      <Touchable
        underlayColor={WHITE_TRANSPARENT_COLOR}
        onPress={this.onPress}
      >
        <View>
          <SettingsItem
            title={this.props.intl.formatMessage({
              id: 'settingsDialog.changeCountry'
            })}
            subtitle={this.props.tenant}
          />
        </View>
      </Touchable>
    )
  }
}

TenantSelectorSettingsButtonContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tenant: PropTypes.string.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

const mapStateToProps = state => {
  return {
    tenant: COUNTRIES.find(
      item => item.tenantId === state.TenantReducer.current.id
    ).name
  }
}

const TenantSelectorSettingsButtonContainerwithRedux = connect(mapStateToProps)(
  TenantSelectorSettingsButtonContainer
)

export default injectIntl(TenantSelectorSettingsButtonContainerwithRedux)
