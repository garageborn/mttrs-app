/* eslint-disable camelcase  */
/* eslint-disable react/jsx-no-bind  */

import React, { PropTypes, PureComponent } from 'react'
import { Text, View } from 'react-native'
import Touchable from '../Touchable'
import PublisherListItem from '../PublisherListItem'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import { stringify } from '../../common/utils/Parser'
import styles from './styles'

class PublisherSelectorListItem extends PureComponent {
  count () {
    const { publisher } = this.props
    if (!publisher.today_stories_count) return '--'
    return stringify(publisher.today_stories_count)
  }

  rightContent () {
    return <Text style={styles.count}>{this.count()}</Text>
  }

  render () {
    const { publisher, onPress } = this.props

    return (
      <Touchable onPress={() => onPress(publisher)} underlayColor={WHITE_TRANSPARENT_COLOR}>
        <View style={styles.container}>
          <PublisherListItem active publisher={publisher} rightContent={this.rightContent()} />
        </View>
      </Touchable>
    )
  }
}

PublisherSelectorListItem.propTypes = {
  publisher: PropTypes.shape({
    name: PropTypes.string.isRequired,
    today_stories_count: PropTypes.number
  }),
  onPress: PropTypes.func.isRequired
}

export default PublisherSelectorListItem
