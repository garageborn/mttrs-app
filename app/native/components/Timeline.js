import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Platform, ListView, View, Text, RefreshControl, ActivityIndicator } from 'react-native'
import styles from '../styles/App'
import Story from './Story'
import ListViewHeader from './ListViewHeader'
import ParseDate from '../../common/utils/ParseDate'

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
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
          <ActivityIndicator
            size="large"
            color="#aaa"
          />
        </View>
      )
    }

    return (
      <ListView
        style={[styles.listView, this.listViewStyle]}
        dataSource={this.dataSource()}
        renderRow={this.props.storyRenderer}
        renderSectionHeader={this.renderSectionHeader}
        refreshControl={this.refreshControl()}
        onEndReached={onEndReached}
        />
    )
  }

  get listViewStyle() {
    if (this.props.uiReducer.menu.isOpen && Platform.OS === 'ios') return { position: 'absolute' }
  }
}

Timeline.propTypes = {
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFetchingTop: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onEndReached: PropTypes.func.isRequired,
  storyRenderer: PropTypes.func.isRequired
}

let mapStateToProps = (state) => {
  const { uiReducer } = state
  return { uiReducer }
}

export default connect(mapStateToProps)(Timeline)
