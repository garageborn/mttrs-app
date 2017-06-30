import React, { PureComponent, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { NavigationActions } from '../../actions/index'
import Touchable from '../../components/Touchable'
import SettingsItem from '../../components/SettingsItem'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'

class NotificationSettingsButtonContainer extends PureComponent {
  constructor () {
    super()
    this.onPress = this.onPress.bind(this)
  }

  onPress () {
    this.props.dispatch(NavigationActions.notifications())
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
              id: 'notifications.label'
            })}
          />
        </View>
      </Touchable>
    )
  }
}

NotificationSettingsButtonContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

const NotificationSettingsButtonContainerwithRedux = connect()(
  NotificationSettingsButtonContainer
)

export default injectIntl(NotificationSettingsButtonContainerwithRedux)
