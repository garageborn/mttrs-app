import React, { Component, PropTypes } from 'react'
import { InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import _debounce from 'lodash/debounce'
import withQuery from './index.gql'
import ApolloError from '../../components/ApolloError'
import PublisherMenu from '../../components/PublisherMenu'
import Loader from '../../components/PublisherMenuLoader'
import { NavigationActions, MenuActions } from '../../actions/index'

class PublisherMenuContainer extends Component {
  constructor () {
    super()

    this.state = {
      query: ''
    }

    this.openPublisher = this.openPublisher.bind(this)
    this.getPublishers = this.getPublishers.bind(this)
    this.onClearSearch = this.onClearSearch.bind(this)
    this.onChangeText = _debounce(this.onChangeText.bind(this), 300)
    this.emptyInput = this.emptyInput.bind(this)
  }

  emptyInput () {
    return this.state.query === ''
  }

  getPublishers (query) {
    if (!query) return this.props.data.publishers

    const queryMatcher = new RegExp(query, 'i')
    const publishers = this.props.data.publishers.filter(publisher => {
      return publisher.name.match(queryMatcher) || publisher.slug.match(queryMatcher)
    })

    return publishers
  }

  render () {
    const { loading, error } = this.props.data

    if (loading) return <Loader />

    if (error) return this.renderError()

    return (
      <PublisherMenu
        query={this.state.query}
        emptyInput={this.emptyInput}
        publishers={this.getPublishers(this.state.query)}
        openPublisher={this.openPublisher}
        onChangeText={this.onChangeText}
        onClearSearch={this.onClearSearch}
      />
    )
  }

  onChangeText (query) {
    this.setState({query})
  }

  onClearSearch () {
    this.setState({ query: '' })
  }

  renderError () {
    return <ApolloError skinType='dark' data={this.props.data} />
  }

  openPublisher (publisher) {
    this.props.dispatch(MenuActions.closeMenu())
    InteractionManager.runAfterInteractions(() => {
      this.props.dispatch(NavigationActions.selectPublisher(publisher))
    })
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    StorageReducer: state.StorageReducer
  }
}

PublisherMenuContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.shape({
    publishers: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.any
  })
}

const PublisherMenuContainerWithData = withQuery(PublisherMenuContainer)
export default connect(mapStateToProps)(PublisherMenuContainerWithData)
