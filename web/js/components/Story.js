import React, {Component, PropTypes} from 'react'
import moment from 'moment'

class Story extends Component {
  render() {
    const {story, onClick} = this.props
    return (
      <li onClick={() => { onClick(story) }}>
        {this.image}
        {story.title}
        {this.footer}
      </li>
    )
  }

  get image() {
    if (!this.props.story.image) return
    return (
      <img src={this.props.story.image.thumb} />
    )
  }

  get footer() {
    let createdAt = moment(this.props.story.created_at).format('hA')
    let publisher = this.publisher
    if (!this.publisher) return (<p>@{createdAt}</p>)
    return (<p>@{createdAt} from {this.publisher}</p>)
  }

  get publisher() {
    if (!this.props.story.publisher) return
    return (
      <span>{this.props.story.publisher.name}</span>
    )
  }
}

Story.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
}

export default Story
