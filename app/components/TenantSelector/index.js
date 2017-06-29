import React, { PropTypes } from 'react'
import { Image, Text, View } from 'react-native'
import { injectIntl } from 'react-intl'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import { COUNTRIES } from '../../constants/Countries'
import TenantListItem from '../TenantListItem'
import Touchable from '../Touchable'
import TenantIconsDisclaimer from '../TenantIconsDisclaimer'
import activeIcon from './assets/image.png'

const TenantSelector = ({ intl, current, onPress }) => {
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
      <TenantIconsDisclaimer />
    </View>
  )
}

TenantSelector.propTypes = {
  current: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  onPress: PropTypes.func.isRequired
}

export default injectIntl(TenantSelector)
