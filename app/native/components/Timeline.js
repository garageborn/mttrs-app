import React, { Component, PropTypes } from 'react'
import { ListView, View, Text, RefreshControl } from 'react-native'
import styles from '../styles/App'
import Story from './Story'
import ListViewHeader from './ListViewHeader'
import ParseDate from '../../common/utils/ParseDate'

class Timeline extends Component {
  constructor(props) {
    super(props)

    this.renderRow = this.renderRow.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
  }

  renderRow(item) {
    return <Story story={item} openStory={this.props.openStory}/>
  }

  renderSectionHeader(sectionData, date) {
    return <ListViewHeader date={ParseDate(date)} />
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
    items.forEach(item => {
      if (item.stories.length) {
        let section = item.date
        sections.push(section)
        rows[section] = item.stories
      }
    })

    return {rows, sections}
  }

  refreshControl() {
    const { isFetchingTop, onRefresh } = this.props
    return (
      <RefreshControl
        style={styles.hideRefreshControl}
        refreshing={isFetchingTop}
        onRefresh={onRefresh}
        tintColor='#FFF'
        title='Refreshing...'
        titleColor='#FFF'
        colors={['#FFF']}
        progressBackgroundColor='#FFF'
       />
    )
  }

  render() {
    const { isFetching, onEndReached } = this.props

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
        renderRow={this.renderRow}
        renderSectionHeader={this.renderSectionHeader}
        refreshControl={this.refreshControl()}
        onEndReached={onEndReached}
        />
    )
  }
}

Timeline.propTypes = {
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFetchingTop: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onEndReached: PropTypes.func.isRequired,
  openStory: PropTypes.func.isRequired,
}

export default Timeline
