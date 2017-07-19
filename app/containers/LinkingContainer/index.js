import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Linking, Platform } from 'react-native'
import { TenantActions } from '../../actions/index'
import LinkLinkingContainer from '../LinkLinkingContainer'
import PublisherLinkingContainer from '../PublisherLinkingContainer'
import PublishersLinkingContainer from '../PublishersLinkingContainer'
import PopularLinkingContainer from '../PopularLinkingContainer'
import FavoritesLinkingContainer from '../FavoritesLinkingContainer'

class LinkingContainer extends Component {
  constructor () {
    super()
    this.state = {
      section: '',
      slug: '',
      navigating: false
    }
    this.resetNavigating = this.resetNavigating.bind(this)
  }

  componentDidMount () {
    this.addListener()
  }

  componentWillUnmount () {
    this.removeListener()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.tenant.current.id !== nextProps.tenant.current.id && !this.state.navigating) {
      this.setState({
        section: '',
        slug: ''
      })
    }
  }

  addListener () {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        if (!url) return
        this.handleNavigation(url)
      });
    } else {
      Linking.addEventListener('url', e => this.openURL(e))
    }
  }

  removeListener () {
    Linking.removeEventListener('url', e => this.openURL(e))
  }

  openURL (event) {
    this.handleNavigation(event.url)
  }

  handleNavigation (url) {
    const route = url.replace(/.*?:\/\//g, '')
    const tenant = route.split('/')[0]
    const section = route.split('/')[1]
    const slug = route.split('/')[2]

    if (this.props.tenant.current.id !== tenant) {
      this.setNavigation(section, slug)
      return this.handleTenant(tenant)
    }

    return this.setNavigation(section, slug)
  }

  setNavigation (section, slug) {
    this.setState({
      section,
      slug,
      navigating: true
    })
  }

  handleTenant (tenant) {
    this.setTenant(tenant)
  }

  setTenant (id) {
    this.props.dispatch(TenantActions.setCurrent(id))
  }

  resetNavigating () {
    this.setState({
      navigating: false
    })
  }

  render () {
    const { section, slug } = this.state
    if (!this.props.tenant.isLoaded) return null

    switch (section) {
      case 'link':
        return <LinkLinkingContainer slug={slug} resetNavigating={this.resetNavigating} />
      case 'publisher':
        return <PublisherLinkingContainer slug={slug} resetNavigating={this.resetNavigating} />
      case 'publishers':
        return <PublishersLinkingContainer resetNavigating={this.resetNavigating} />
      case 'popular':
        return <PopularLinkingContainer resetNavigating={this.resetNavigating} />
      case 'favorites':
        return <FavoritesLinkingContainer resetNavigating={this.resetNavigating} />
      default:
        return null
    }
  }
}

LinkingContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tenant: PropTypes.shape({
    current: PropTypes.shape({
      id: PropTypes.string
    }),
    isLoaded: PropTypes.bool.isRequired
  }).isRequired
}

const mapStateToProps = (state) => {
  return { tenant: state.TenantReducer }
}

export default connect(mapStateToProps)(LinkingContainer)
