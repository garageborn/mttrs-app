import React, {Component, PropTypes} from 'react'

class Story extends Component {
  render() {
    const {story, onClick} = this.props
    return (
      <li onClick={() => { onClick(story) }}>
        {story.title}
      </li>
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
