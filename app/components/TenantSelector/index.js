import React, { PropTypes } from 'react'
import { Image, View } from 'react-native'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import { COUNTRIES } from '../../constants/Countries'
import TenantListItem from '../TenantListItem'
import Touchable from '../Touchable'
import activeIcon from './assets/image.png'

const TenantSelector = ({ current, onPress }) => {
  const active = item => current.id === item.tenantId

  const renderRightContent = item =>
    (active(item) ? <Image source={activeIcon} /> : null)

  const renderItem = item => (
    <Touchable
      key={`tenant_${item.tenantId}`}
      onPress={() => onPress(item.tenantId)}
      underlayColor={WHITE_TRANSPARENT_COLOR}
    >
      <View>
        <TenantListItem
          active={active(item)}
          country={item}
          rightContent={renderRightContent(item)}
        />
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
  current: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  onPress: PropTypes.func.isRequired
}

export default TenantSelector
