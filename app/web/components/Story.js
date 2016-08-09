import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import moment from 'mttrs/app/web/utils/Moment'
import * as cloudinary from 'mttrs/app/web/utils/Cloudinary'
import {publisherPath} from 'mttrs/app/web/utils/RoutesHelper'

class Story extends Component {
  render() {
    const {story} = this.props
    return (
      <div className='story'>
        <a href={story.url} target='_blank'>{this.image}</a>
        <div className='story-text'>
          <h3>
            <a href={story.url} target='_blank'>{story.title}</a>
            <sup>({story.total_social})</sup>
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
    if (!this.publishers) return (<p>@{this.publishedAt}</p>)
    return (<div>@{this.publishedAt} <i>from</i> {this.publishers}</div>)
  }

  get publishedAt() {
    let publishedAt = moment(this.props.story.published_at)

    return publishedAt.calendar(null, {
      lastDay : '[Yesterday] hA',
      sameDay : '[] hA',
      lastWeek : 'MMMM D, hA',
      sameElse : 'MMMM D, hA'
    })
  }

  get publishers() {

    let links = this.props.story.links

    if (!links) return

    const flatten = list => list.reduce(
      (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
    )

    let publishers = links.map((link, index) => {
      if (index < links.length - 2) {
        return [
          <Link key={link.id} to={link.url} target='_blank' title={link.title}>
            <span>{link.publisher.name}</span>
          </Link>,
          <span key={link.id + Math.random}>, </span>
        ]
      }

      if (index === links.length - 2) {
        return [
          <Link key={link.id} to={link.url} target='_blank' title={link.title}>
            <span>{link.publisher.name}</span>
          </Link>,
          <span key={link.id + Math.random}> and </span>
        ]
      }

      return [
        <Link key={link.id} to={link.url} target='_blank' title={link.title}>
          <span>{link.publisher.name}</span>
        </Link>
      ]
    })

    return (
      <div className='story-publishers'>{flatten(publishers)}</div>
    )
  }
}

Story.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired
}

export default Story
