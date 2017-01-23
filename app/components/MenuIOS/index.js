import React, { PropTypes } from 'react'
import { View } from 'react-native'
import ButtonGroup from '../../components/ButtonGroup'
import styles from './styles'

const Menu = ({
  currentTab,
  changeCurrentTab,
  currentTabIndex,
  buttonGroupLabels
}) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.selector}>
        <ButtonGroup
          underlayColor={'rgba(255,255,255,.1)'}
          selectedBackgroundColor='#F1F1F1'
          onPress={changeCurrentTab}
          selectedIndex={currentTabIndex}
          buttons={buttonGroupLabels}
        />
      </View>
      <View style={styles.menuContainer}>
        {currentTab}
      </View>
    </View>
  )
}

Menu.propTypes = {
  currentTab: PropTypes.element.isRequired,
  changeCurrentTab: PropTypes.func.isRequired,
  currentTabIndex: PropTypes.number.isRequired,
  buttonGroupLabels: PropTypes.array.isRequired
}

export default Menu
