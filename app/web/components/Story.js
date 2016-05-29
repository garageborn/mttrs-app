import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import * as cloudinary from 'mttrs/app/web/utils/Cloudinary'

class Story extends Component {
  render() {
    const {story, onClick} = this.props
    return (
      <div className='story' onClick={onClick.bind(this, story)}>
        <a>{this.image}</a>
        <div className='story-text'>
          <h3>
            <a>{story.title}</a>
            <small> ({story.total_social})</small>
          </h3>
          {this.storyInfo}
        </div>
      </div>
    )
  }

  get image() {
    if (!this.props.story.image_source_url) return
    let options = { type: 'fetch', width: 200, height: 200, crop: 'fit' }
    return (<img src={cloudinary.url(this.props.story.image_source_url, options)}/>)
  }

  get storyInfo() {
    if (!this.publisher) return (<p>@{this.createdAt}</p>)
    return (<p>@{this.createdAt} <i>from</i> {this.publisher}</p>)
  }

  get createdAt() {
    let createdAt = moment(this.props.story.created_at)

    return createdAt.calendar(null, {
      lastDay : '[Yesterday] hA',
      sameDay : '[] hA',
      lastWeek : 'MMMM D, hA',
      sameElse : 'MMMM D, hA'
    })
  }

  get publisher() {
    if (!this.props.story.publisher) return
    return (<span>{this.props.story.publisher.name}</span>)
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
