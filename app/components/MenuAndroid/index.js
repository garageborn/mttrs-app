import React, { Component, PropTypes } from 'react'
import { TabViewAnimated, TabBar } from 'react-native-tab-view'
import { injectIntl, defineMessages } from 'react-intl'
import { connect } from 'react-redux'
import PublisherMenuContainer from '../../containers/PublisherMenuContainer'
import CategoryMenuContainer from '../../containers/CategoryMenuContainer'
import { MenuActions } from '../../actions'
import styles from './styles'

const messages = defineMessages({
  headerCategories: {
    id: 'header.categories'
  },
  headerPublishers: {
    id: 'header.publishers'
  }
})

class MenuAndroid extends Component {
  constructor (props) {
    super(props)
    const { formatMessage } = props.intl
    const categories = formatMessage(messages.headerCategories)
    const publishers = formatMessage(messages.headerPublishers)
    this.handleChangeTab = this.handleChangeTab.bind(this)
    this.state = {
      index: 0,
      routes: [
        { key: '1', type: 'categories', title: categories },
        { key: '2', type: 'publishers', title: publishers }
      ]
    }
  }

  componentDidMount () {
    this.setState({
      ...this.state,
      index: this.currentTabIndex
    })
  }

  get currentTabIndex () {
    return this.state.routes.indexOf(this.currentTab)
  }

  get currentTab () {
    return this.state.routes.find((route) => route.type === this.props.uiReducer.menu.currentTab)
  }

  handleChangeTab (index) {
    this.setState({ index })
    this.props.dispatch(MenuActions.changeMenuTab(this.state.routes[index].type))
  }

  renderHeader (props) {
    return (
      <TabBar
        {...props}
        style={styles.tabBar}
        indicatorStyle={styles.indicatorStyle}
      />
    )
  }

  renderScene ({route}) {
    switch (route.key) {
      case '1':
        return <CategoryMenuContainer />
      case '2':
        return <PublisherMenuContainer />
      default:
        return
    }
  }

  render () {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this.renderScene}
        renderHeader={this.renderHeader}
        onRequestChangeTab={this.handleChangeTab}
      />
    )
  }
}

MenuAndroid.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

const mapStateToProps = state => {
  return { uiReducer: state.uiReducer }
}

const intlMenuAndroid = injectIntl(MenuAndroid)
export default connect(mapStateToProps)(intlMenuAndroid)
