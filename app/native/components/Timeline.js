import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Platform, ListView, View, Text, RefreshControl, ActivityIndicator } from 'react-native'
import { TimelineActions } from '../actions/index'
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
        tintColor='#DDD'
        title='Refreshing...'
        titleColor='#AAA'
        progressBackgroundColor='#FFF'
       />
    )
  }

  render() {
    const { onEndReached } = this.props

    if (!this.props.navigationState.loaded) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color="#AAA"
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
    // if (this.props.uiReducer.menu.isOpen && Platform.OS === 'ios') return { position: 'absolute' }
  }
}

Timeline.propTypes = {
  // items: PropTypes.array.isRequired,
  // isFetchingTop: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onEndReached: PropTypes.func.isRequired,
  storyRenderer: PropTypes.func.isRequired
}

let mapStateToProps = (state, ownProps) => {
  let { index } = ownProps.navigationState
  let route = ownProps.navigationState.routes[index]
  console.log(route)

  return {
    uiReducer: state.uiReducer
  }
}

export default connect(mapStateToProps)(Timeline)
