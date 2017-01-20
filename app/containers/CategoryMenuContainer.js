import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './CategoryMenuContainer.gql'
import CategoryScrollView from '../components/CategoryScrollView'
import TopStoriesCategory from '../components/TopStoriesCategory'
import MenuSettingsLabel from '../components/MenuSettingsLabel'
import SettingsModal from '../components/SettingsModal'
import { NavigationActions, MenuActions } from '../actions/index'

class CategoryMenuContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modalVisible: false
    }

    this.openHome = this.openHome.bind(this)
    this.openCategory = this.openCategory.bind(this)
    this.toggleSettingsModal = this.toggleSettingsModal.bind(this)
  }

  render () {
    let namespaceTitle = this.getTenantName(this.props.StorageReducer.tenant.name)
    return (
      <View>
        <TopStoriesCategory openHome={this.openHome} />
        <CategoryScrollView data={this.props.data} openCategory={this.openCategory} />
        <MenuSettingsLabel onPress={this.toggleSettingsModal} namespace={namespaceTitle} />
        <SettingsModal visible={this.state.modalVisible} close={this.toggleSettingsModal} />
      </View>
    )
  }

  toggleSettingsModal () {
    this.setState({modalVisible: !this.state.modalVisible})
  }

  openHome () {
    this.props.dispatch(MenuActions.retractMenu())
    this.props.dispatch(NavigationActions.home())
  }

  openCategory (category) {
    this.props.dispatch(MenuActions.retractMenu())
    this.props.dispatch(NavigationActions.selectCategory(category))
  }

  getTenantName (tenant) {
    const tenants = {
      mttrs_us: 'English - USA/UK',
      mttrs_br: 'Português - Brasil'
    }

    return tenants[tenant]
  }
}

const mapStateToProps = (state) => {
  return {
    StorageReducer: state.StorageReducer
  }
}

CategoryMenuContainer.propTypes = {
  StorageReducer: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

const CategoryMenuContainerWithData = withQuery(CategoryMenuContainer)
export default connect(mapStateToProps)(CategoryMenuContainerWithData)
