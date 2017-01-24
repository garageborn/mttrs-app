import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { injectIntl, defineMessages } from 'react-intl'
import Menu from '../components/Menu'
import CategoryMenuContainer from './CategoryMenuContainer'
import PublisherMenuContainer from './PublisherMenuContainer'
import { MenuActions } from '../actions/index'

const messages = defineMessages({
  headerCategories: {
    id: 'header.categories',
    defaultMessage: 'Categories'
  },
  headerPublishers: {
    id: 'header.publishers',
    defaultMessage: 'Publishers'
  }
})

class MenuContainer extends Component {
  constructor (props) {
    super(props)
    const { formatMessage } = this.props.intl
    const categories = formatMessage(messages.headerCategories)
    const publishers = formatMessage(messages.headerPublishers)
    this.changeCurrentTab = this.changeCurrentTab.bind(this)
    this.state = {
      tabs: [
        { id: 'categories', label: categories, component: <CategoryMenuContainer params={this.props.params} /> },
        { id: 'publishers', label: publishers, component: <PublisherMenuContainer /> }
      ]
    }
  }

  changeCurrentTab (selectedIndex) {
    const selectedTab = this.state.tabs[selectedIndex]
    this.props.dispatch(MenuActions.changeMenuTab(selectedTab.id))
  }

  render () {
    return (
      <Menu
        currentTab={this.currentTab.component}
        currentTabIndex={this.currentTabIndex}
        changeCurrentTab={this.changeCurrentTab}
        buttonGroupLabels={this.labels}
        params={this.props.params}
      />
    )
  }

  get labels () {
    return this.state.tabs.map(tab => tab.label)
  }

  get currentTabIndex () {
    return this.state.tabs.indexOf(this.currentTab)
  }

  get currentTab () {
    return this.state.tabs.find((tab) => tab.id === this.props.uiReducer.menu.currentTab)
  }
}

MenuContainer.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  uiReducer: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return { uiReducer: state.uiReducer }
}

const intlMenuContainer = injectIntl(MenuContainer)
export default connect(mapStateToProps)(intlMenuContainer)
