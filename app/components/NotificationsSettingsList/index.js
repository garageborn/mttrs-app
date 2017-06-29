import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { COUNTRIES } from '../../constants/Countries'
import NotificationsSettingsItemContainer
  from '../../containers/NotificationsSettingsItemContainer'

class NotificationsSettingsList extends Component {
  constructor () {
    super()
    this.renderItem = this.renderItem.bind(this)
  }

  render () {
    return <FlatList data={COUNTRIES} renderItem={this.renderItem} />
  }

  renderItem (data) {
    return <NotificationsSettingsItemContainer data={data} />
  }
}

export default NotificationsSettingsList
