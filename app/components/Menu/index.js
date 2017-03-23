import React, { PropTypes, Component } from 'react'
import { View, Platform } from 'react-native'
import MenuIOS from '../MenuIOS'
import MenuAndroid from '../MenuAndroid'
import MenuSettingsLabel from '../MenuSettingsLabel'
import SettingsModal from '../SettingsModal'
import styles from './styles'

class Menu extends Component {
  render () {
    const { namespace, settingsOpen, toggleSettingsModal } = this.props
    return (
      <View style={styles.menu}>
        {this.renderMenu()}
        <MenuSettingsLabel
          onPress={toggleSettingsModal}
          namespace={namespace}
        />
        <SettingsModal
          visible={settingsOpen}
          close={toggleSettingsModal}
        />
      </View>
    )
  }

  renderMenu () {
    return Platform.select({
      ios: <MenuIOS {...this.props} />,
      android: <MenuAndroid {...this.props} />
    })
  }
}

Menu.propTypes = {
  namespace: PropTypes.string.isRequired,
  settingsOpen: PropTypes.bool.isRequired,
  toggleSettingsModal: PropTypes.func.isRequired
}

export default Menu
