import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'

class PublisherTag extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Link to={this.props.url} title={this.props.title} target='_blank'>
          <span>{this.props.name}</span>
        </Link>
        <span>{this.props.separator}</span>
      </div>
    )
  }
}

PublisherTag.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  separator: PropTypes.string
}

export default PublisherTag
