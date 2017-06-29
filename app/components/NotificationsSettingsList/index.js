import React from 'react'
import { FlatList } from 'react-native'
import { COUNTRIES } from '../../constants/Countries'
import NotificationsSettingsItemContainer
  from '../../containers/NotificationsSettingsItemContainer'

const NotificationsSettingsList = () => {
  const extractKey = (item, index) => `notificationSettings_${index}`

  const renderRow = data => (
    <NotificationsSettingsItemContainer extractKey={extractKey} data={data} />
  )

  return <FlatList data={COUNTRIES} renderItem={renderRow} />
}

export default NotificationsSettingsList
