import React, { Component, PropTypes } from 'react'
import { ListView, View, Text, RefreshControl } from 'react-native'
import styles from '../styles/App'
import Story from './Story'
import ListViewHeader from './ListViewHeader'
import ParseDate from '../../common/utils/ParseDate'
import moment from '../../common/utils/Moment'

class Timeline extends Component {
  constructor(props) {
    super(props)

    this.getTimelineItem = this.getTimelineItem.bind(this)
    this.renderSeparator = this.renderSeparator.bind(this)
  }

  getTimelineItem(item) {
    return <Story story={item} />
  }

  renderSeparator(sectionData, date) {
    return <ListViewHeader date={ParseDate(date).toUpperCase()} />
  }

  dataSource() {
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (r1, r2) => r1 !== r2
    })

    let { rows, sections } = this.rowsAndSections()
    return ds.cloneWithRowsAndSections(rows, sections)
  }

  rowsAndSections() {
    let rows = {}
    let sections = []
    const { items } = this.props

    items.map((item) => {
      let section = item.date
      sections.push(section)
      rows[section] = item.stories
    })

    return {rows, sections}
  }

  render() {
    const { isFetching, isRefreshing, onRefresh } = this.props

    if (isFetching) {
      return (
        <View style={styles.loading}>
          <Text>Hang on...</Text>
        </View>
      )
    }

    return (
      <ListView
        style={styles.listView}
        dataSource={this.dataSource()}
        renderRow={this.getTimelineItem}
        renderSectionHeader={this.renderSeparator}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor='#2C2E4A'
            title='Refreshing...'
            titleColor='#2C2E4A'
            colors={['#FFF']}
            progressBackgroundColor='#2C2E4A'
           />
        }
        />
    )
  }
}

Timeline.propTypes = {
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired
}

export default Timeline
