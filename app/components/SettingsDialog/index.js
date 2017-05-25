import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import DialogButton from '../DialogButton'
import Touchable from '../Touchable'
const shareIcon = require('../StoryDialog/assets/share.png')

class SettingsDialog extends Component {
  render () {
    return (
      <View>
        {this.renderTenantButton()}
        {this.renderSettingsButton()}
      </View>
    )
  }

  renderTenantButton () {
    const { tenant } = this.props
    if (!tenant.isLoaded) return null
  }

  renderSettingsButton () {
    const { openSettings } = this.props
    return (
      <Touchable onPress={openSettings}>
        <View>
          <DialogButton icon={shareIcon} messages={['batata']} />
        </View>
      </Touchable>
    )
  }
}

SettingsDialog.propTypes = {
  tenant: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  setTenant: PropTypes.func.isRequired,
  openSettings: PropTypes.func.isRequired
}

export default SettingsDialog
