import React, { Component, PropTypes } from 'react'
import { View, Platform, Animated, Easing, Dimensions, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './Link.gql'
import LinkHeaderContainer from '../containers/LinkHeaderContainer'
import WebView from '../components/WebView'
import ProgressBar from '../components/ProgressBar'
import { StorageActions } from '../actions/index'
import { headerHeight } from '../styles/Global'
import styles from '../styles/App'
import { DARK_COLOR } from '../constants/Colors'

class Link extends Component {
  static route = Platform.select({
    ios: {
      navigationBar: {
        renderTitle: (route) => <LinkHeaderContainer params={route.params} />,
        renderLeft: () => <View />,
        renderRight: () => <View />,
        backgroundColor: DARK_COLOR,
        height: headerHeight + 20 // On Link exclusively, we need to pass this value in order to be aligned
      }
    },
    android: null
  })

  constructor () {
    super()

    if (Platform.OS === 'ios') StatusBar.setBarStyle('light-content')

    this.addStoryToLocalStorage = this.addStoryToLocalStorage.bind(this)
    // this.progress = new Animated.Value(0)
    this.state = {
      progress: 0
    }
  }

  componentWillMount () {
    this.createAccess()
  }

  componentDidMount () {
    // this.progressTransition()
  }

  addStoryToLocalStorage () {
    const { dispatch, story } = this.props
    dispatch(StorageActions.addVisitedStory(story))
  }

  // progressTransition () {
  //   this.progress.setValue(0)
  //   Animated.timing(
  //     this.progress,
  //     {
  //       toValue: 2,
  //       duration: 15000,
  //       easing: Easing.linear
  //     }
  //   ).start(() => this.progressTransition())
  // }
  //
  // getProgress () {
  //   const { width } = Dimensions.get('window')
  //   return this.progress.interpolate({
  //     inputRange: [0, 1],
  //     outputRange: [0, width]
  //   })
  // }

  renderProgressBar = () => {
    return <ProgressBar progress={this.state.progress} styleAttr='Horizontal' color='#08C' />
  }

  handleError = (e) => {
    if (e === 'WebKitErrorDomain') return
  }

  get contentInset () {
    return Platform.OS === 'ios' ? 0 : 20
  }

  renderNavbar = (props) => {
    if (Platform.OS === 'ios') return
    return <LinkHeaderContainer params={props.route.params} />
  }

  onProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }

  render () {
    const { url } = this.props.route.params.link
    const { width, height } = Dimensions.get('window')

    return (
      <View style={styles.container}>
        {this.renderNavbar(this.props)}
        <WebView
          source={{uri: url}}
          style={{width, height}}
          contentInset={{top: this.contentInset}}
          startInLoadingState
          renderLoading={this.renderProgressBar}
          onProgress={this.onProgress}
          renderError={this.handleError}
          onLoadEnd={this.addStoryToLocalStorage}
          shouldStartLoadWithRequest={false}
        />
      </View>
    )
  }

  createAccess () {
    this.props.createLinkAccess()
  }
}

Link.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      link: PropTypes.shape({
        url: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired,
  story: PropTypes.object.isRequired,
  createLinkAccess: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

const LinkWithRedux = connect()(Link)
export default withQuery(LinkWithRedux)
