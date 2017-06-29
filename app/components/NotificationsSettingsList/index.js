import React from 'react'
import { View, FlatList } from 'react-native'
import { COUNTRIES } from '../../constants/Countries'
import NotificationsSettingsItemContainer
  from '../../containers/NotificationsSettingsItemContainer'
import TenantIconsDisclaimer
  from '../TenantIconsDisclaimer'

const NotificationsSettingsList = () => {
  const extractKey = (item, index) => `nsl_${index}`

  const renderRow = (data, idx) => (
    <NotificationsSettingsItemContainer data={data} />
  )

  return (
    <View>
      <FlatList data={COUNTRIES} keyExtractor={extractKey} renderItem={renderRow} />
      <TenantIconsDisclaimer />
    </View>
  )
}

export default NotificationsSettingsList
