import React, { Component, PropTypes } from 'react'
import withMutation from './index.gql'
import PublisherSuggestion from '../../components/PublisherSuggestion'

class PublisherSuggestionContainer extends Component {
  constructor () {
    super()
    this.sendSuggestion = this.sendSuggestion.bind(this)
    this.state = { status: '' }
  }

  render () {
    const { query } = this.props
    const { status } = this.state

    return (
      <PublisherSuggestion query={query} sendSuggestion={this.sendSuggestion} status={status} />
    )
  }

  sendSuggestion () {
    this.props.createPublisherSuggestion(this.props.publisher)
      .then(d => this.setState({ status: 'success' }))
      .catch(e => this.setState({ status: 'error' }))
  }
}

PublisherSuggestionContainer.propTypes = {
  createPublisherSuggestion: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired
}

export default withMutation(PublisherSuggestionContainer)
