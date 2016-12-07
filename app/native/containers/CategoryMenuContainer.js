import React, { Component } from 'react'
import { View, ScrollView, Text, Image, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { injectIntl, defineMessages } from 'react-intl'
import CategoryTile from '../components/CategoryTile'
import styles from '../styles/Menu'
import { NavigationActions, MenuActions } from '../actions/index'
import { DARK_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'

const messages = defineMessages({
  topStories: {
    id: 'header.topStories',
    defaultMessage: 'Top Stories'
  }
})

class CategoryMenuContainer extends Component {
  constructor(props) {
    super(props)
    this.openHome = this.openHome.bind(this)
    this.openCategory = this.openCategory.bind(this)
  }

  render() {
    const { formatMessage } = this.props.intl
    return (
      <View>
        <View style={styles.topStoriesContainer}>
          <TouchableHighlight underlayColor={DARK_TRANSPARENT_COLOR} onPress={this.openHome}>
            <View style={this.topStoriesStyles} shadowOffset={{width: 0, height: 2}} shadowColor={'rgba(0, 0, 0, 1)'} shadowOpacity={.5} elevation={1}>
              <Image style={styles.topStoriesIcon} source={this.topStoriesIcon} />
              <Text style={this.topStoriesTitleStyles}>{formatMessage(messages.topStories)}</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.categoriesSection}>
          <ScrollView contentContainerStyle={styles.categories}>
            {this.renderCategories()}
          </ScrollView>
        </View>
      </View>
    )
  }

  get topStoriesStyles() {
    const { name } = this.props.params.section

    return name === 'home' ? styles.topStories : [styles.topStories, styles.topStoriesInactive]
  }

  get topStoriesTitleStyles() {
    const { name } = this.props.params.section

    return name === 'home' ? styles.topStoriesTitle : [styles.topStoriesTitle, styles.topStoriesTitleInactive]
  }

  get topStoriesIcon() {
    const { name } = this.props.params.section

    return name === 'home'
      ? require('../assets/icons/icon-top-stories.png')
      : require('../assets/icons/icon-top-stories-secondary.png')
  }

  renderCategories() {
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

  openHome() {
    this.props.dispatch(MenuActions.retractMenu())
    this.props.dispatch(NavigationActions.home())
  }

  openCategory(category) {
    this.props.dispatch(MenuActions.retractMenu())
    this.props.dispatch(NavigationActions.selectCategory(category))
  }

  isActive(category) {
    const { params } = this.props
    if (params.section == null || typeof params.section.model === 'undefined') return false
    return category.slug === params.section.model.slug
  }
}

const Query = gql`query { categories(ordered: true) { id name slug color icon_id } }`
const intlCategoryMenuContainer = injectIntl(CategoryMenuContainer)
const CategoryMenuContainerWithData = graphql(Query)(intlCategoryMenuContainer)
export default connect()(CategoryMenuContainerWithData)
