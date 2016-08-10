import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'

class PublisherTag extends Component {
  render() {
    return (
      <Link to={this.props.url} title={this.props.title} target='_blank'>
        <span>{this.props.name}</span>
      </Link>
    )
  }
}

PublisherTag.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default PublisherTag
