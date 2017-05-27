import React, { Component, PropTypes } from 'react'
import { InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import _isNull from 'lodash/isNull'
import _debounce from 'lodash/debounce'
import withQuery from './index.gql'
import ApolloError from '../../components/ApolloError'
import PublisherSelector from '../../components/PublisherSelector'
import Loader from '../../components/PublisherMenuLoader'
import { NavigationActions } from '../../actions/index'

class PublisherSelectorContainer extends Component {
  constructor () {
    super()
    this.state = { query: '' }

    this.openPublisher = this.openPublisher.bind(this)
    this.getPublishers = this.getPublishers.bind(this)
    this.handleQuery = _debounce(this.handleQuery.bind(this), 300)
    this.emptyInput = this.emptyInput.bind(this)
  }

  emptyInput () {
    return this.state.query === ''
  }

  getPublishers (query) {
    if (!query) return this.props.data.publishers

    const queryMatcher = new RegExp(query, 'i')
    const publishers = this.props.data.publishers.filter(publisher => {
      return this.matchDisplayName(publisher, queryMatcher) ||
        publisher.name.match(queryMatcher) ||
        publisher.slug.match(queryMatcher)
    })

    return publishers
  }

  matchDisplayName (publisher, queryMatcher) {
    if (_isNull(publisher.display_name)) return
    return publisher.display_name.match(queryMatcher)
  }

  render () {
    const { loading, error } = this.props.data

    if (loading) return <Loader />

    if (error) return this.renderError()

    return (
      <PublisherSelector
        query={this.state.query}
        emptyInput={this.emptyInput}
        publishers={this.getPublishers(this.state.query)}
        openPublisher={this.openPublisher}
        handleQuery={this.handleQuery}
      />
    )
  }

  handleQuery (query) {
    this.setState({query})
  }

  renderError () {
    return <ApolloError skinType='dark' data={this.props.data} />
  }

  openPublisher (publisher) {
    InteractionManager.runAfterInteractions(() => {
      this.props.dispatch(NavigationActions.publisher(publisher))
    })
  }
}

PublisherSelectorContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.shape({
    publishers: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.any
  })
}

const PublisherSelectorContainerWithData = withQuery(PublisherSelectorContainer)
export default connect()(PublisherSelectorContainerWithData)
