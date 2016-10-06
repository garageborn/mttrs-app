import React, {Component, PropTypes} from 'react'
import moment from '../../common/utils/Moment'
import ComponentsJoiner from '../utils/ComponentsJoiner'
import PublisherTag from './PublisherTag'
import * as cloudinary from '../../common/utils/Cloudinary'
import {publisherPath} from '../utils/RoutesHelper'
import ParseDate from '../../common/utils/ParseDate'

class Story extends Component {
  render() {
    const {story} = this.props
    return (
      <div className='story'>
        <a href={this.mainLink.url} target='_blank'>{this.renderImage()}</a>
        <div className='story-text'>
          <h3>
            <a href={this.mainLink.url} target='_blank'>{this.mainLink.title}</a>
            <sup>({story.total_social})</sup>
          </h3>
          { this.renderStoryInfo() }
        </div>
      </div>
    )
  }

  renderImage() {
    if (!this.mainLink.image_source_url) return
    let options = { type: 'fetch', width: 200, height: 200, crop: 'fit', secure: true }
    return (<img src={cloudinary.url(this.mainLink.image_source_url, options)}/>)
  }

  renderStoryInfo() {
    return (
      <div>
        @{ ParseDate(moment(this.mainLink.published_at).unix()) }
        <i> from </i> { this.renderPublishers() }
      </div>
    )
  }

  renderPublishers() {
    let links = [this.mainLink].concat(this.otherLinks)

    let publishers = links.map((link) => {
      let props = { url: link.url, title: link.title, name: link.publisher.name }
      return <PublisherTag {...props} />
    })

    return (
      <div className='story-publishers'>{ComponentsJoiner(publishers)}</div>
    )
  }

  get mainLink() {
    return this.props.story.main_link
  }

  get otherLinks() {
    return this.props.story.other_links
  }
}

Story.propTypes = {
  story: PropTypes.object.isRequired
}

export default Story
