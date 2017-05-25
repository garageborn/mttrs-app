import React from 'react'
import { Text, View } from 'react-native'
import headerStyles from '../../styles/Header'

const HeaderTitle = ({ title }) => (
  <View>
    <Text style={headerStyles.headerTitleStyle}>{title}</Text>
  </View>
)

export default HeaderTitle
