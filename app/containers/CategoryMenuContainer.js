import React, { Component, PropTypes } from 'react'
import { View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import CategoryTile from '../components/CategoryTile'
import TopStoriesCategory from '../components/TopStoriesCategory'
import MenuSettingsLabel from '../components/MenuSettingsLabel'
import SettingsModal from '../components/SettingsModal'
import styles from '../styles/Menu'
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
        <View>
          <ScrollView contentContainerStyle={styles.categories}>
            {this.renderCategories()}
          </ScrollView>
        </View>
        <MenuSettingsLabel onPress={this.toggleSettingsModal} namespace={namespaceTitle} />
        <SettingsModal visible={this.state.modalVisible} close={this.toggleSettingsModal} />
      </View>
    )
  }

  toggleSettingsModal () {
    this.setState({modalVisible: !this.state.modalVisible})
  }

  renderCategories () {
    const { categories, loading } = this.props.data

    if (loading) return
    return categories.map((category) => {
      return (
        <CategoryTile
          key={category.id}
          category={category}
          onPress={this.openCategory}
          isActive={this.isActive(category)}
        />
      )
    })
  }

  openHome () {
    this.props.dispatch(MenuActions.retractMenu())
    this.props.dispatch(NavigationActions.home())
  }

  openCategory (category) {
    this.props.dispatch(MenuActions.retractMenu())
    this.props.dispatch(NavigationActions.selectCategory(category))
  }

  isActive (category) {
    const { params } = this.props
    if (params.section == null || typeof params.section.model === 'undefined') return false
    return category.slug === params.section.model.slug
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
  params: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

const Query = gql`query { categories(ordered: true) { id name slug color icon_id } }`
const CategoryMenuContainerWithData = graphql(Query)(CategoryMenuContainer)
export default connect(mapStateToProps)(CategoryMenuContainerWithData)
