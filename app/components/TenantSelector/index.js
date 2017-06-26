import React, { PropTypes } from 'react'
import { View } from 'react-native'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import { COUNTRIES } from '../../constants/Countries'
import CountryListItem from '../CountryListItem'
import Touchable from '../Touchable'

const TenantSelector = ({ onPress }) => {
  const renderItem = item => (
    <Touchable
      key={`tenant_${item.tenantId}`}
      onPress={() => onPress(item.tenantId)}
      underlayColor={WHITE_TRANSPARENT_COLOR}
    >
      <View>
        <CountryListItem country={item} />
      </View>
    </Touchable>
  )

  const renderList = () => COUNTRIES.map(item => renderItem(item))

  return (
    <View>
      {renderList()}
    </View>
  )
}

TenantSelector.propTypes = {
  onPress: PropTypes.func.isRequired
}

export default TenantSelector
