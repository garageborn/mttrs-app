/* eslint-disable camelcase  */
/* eslint-disable react/jsx-no-bind  */

import React, { PropTypes, Component } from 'react'
import { Text, View } from 'react-native'
import Touchable from '../Touchable'
import PublisherListItem from '../PublisherListItem'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import { stringify } from '../../common/utils/Parser'
import styles from './styles'

class PublisherSelectorListItem extends Component {
  render () {
    let { publisher, onPress } = this.props

    return (
      <Touchable
        style={styles.touch}
        onPress={() => onPress(publisher)}
        underlayColor={WHITE_TRANSPARENT_COLOR}
      >
        <View style={styles.container}>
          <PublisherListItem active publisher={publisher} rightContent={this.rightContent} />
        </View>
      </Touchable>
    )
  }

  get rightContent () {
    return <Text style={styles.count}>{this.count}</Text>
  }

  get count () {
    let { today_stories_count } = this.props.publisher
    if (!today_stories_count) return '--'
    return stringify(today_stories_count)
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
