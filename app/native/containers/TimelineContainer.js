import React, { Component, PropTypes } from 'react'
import { View, Animated, Dimensions, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { TabViewAnimated } from 'react-native-tab-view';
import { NavigationActions } from '@exponent/ex-navigation'
import { MenuActions, CategoryActions } from '../actions/index'
import Timeline from '../components/Timeline'
import StoryContainer from './StoryContainer'
import StoryLinksContainer from './StoryLinksContainer'
import Router from '../config/Router'
import styles from '../styles/App'
import MenuContainer from './MenuContainer'

const { height } = Dimensions.get('window')

const tabViewStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class TimelineContainer extends Component {
  static fetchData({ dispatch }) {
    return dispatch(CategoryActions.getCategories())
  }

  constructor(props) {
    super(props)
    this.onEndReached = this.onEndReached.bind(this)
    this.onPullToRefresh = this.onPullToRefresh.bind(this)
    this.renderStory = this.renderStory.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.state = {
      menuPositionY: new Animated.Value(-height),
      navigationState: {
        index: 0,
        routes: [
         { key: '1', title: 'Timeline', type: 'timeline' }
        ],
      }
    }
  }

  _handleChangeTab = (index) => {
    this.setState({
      navigationState: {
        index,
        routes: this.state.navigationState.routes
      }
    });
  };

  _renderScene = ({ route }) => {
    const { items, isFetching, isFetchingTop } = this.props
    switch (route.type) {
    case 'timeline':
      return <Timeline
              type='timeline'
              items={items}
              routeKey={route.key}
              activeIndex={this.state.navigationState.index}
              isFetching={isFetching}
              isFetchingTop={isFetchingTop}
              onEndReached={this.onEndReached}
              onRefresh={this.onPullToRefresh}
              storyRenderer={this.renderStory}
            />
    case 'category':
      return <Timeline
              type='category'
              typeSectionId={this.state.navigationState.routes[1]}
              routeKey={route.key}
              activeIndex={this.state.navigationState.index}
              items={items}
              isFetching={isFetching}
              isFetchingTop={isFetchingTop}
              onEndReached={this.onEndReached}
              onRefresh={this.onPullToRefresh}
              storyRenderer={this.renderStory}
            />
    // return ()
    default:
      return null;
    }
  };

  componentDidMount() {
    this.constructor.fetchData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    const { categories } = this.props;
    // let nextSection = nextProps.params.section || {}
    // let currentSection = this.props.params.section || {}
    //
    // let sectionNameChanged = nextSection.name !== currentSection.name
    // let sectionModelChanged = nextSection.model !== currentSection.model
    // if (sectionNameChanged || sectionModelChanged) this.fetchData(nextProps)
    if (categories.length < nextProps.categories.length) {
      let newRoutes = nextProps.categories.map((item, idx) => {
        return { key: `${idx+2}`, title: item.name, type: 'category' }
      })
      this.setState({
        navigationState: {
          ...this.state.navigationState,
          routes: [...this.state.navigationState.routes, ...newRoutes ]
        }
      })
    }
    if (nextProps.uiReducer.menu.isOpen) this.animate('in')
    if (nextProps.uiReducer.menu.retract) this.animate('out')
  }

  pullFetchData(props) {
    // let action = TimelineActions.pullToRefresh(this.fetchQuery(props))
    // return props.dispatch(action)
  }

  infiniteFetchData(props) {
    // let action = TimelineActions.infiniteToRefresh(this.fetchQuery(props))
    // return props.dispatch(action)
  }

  onPullToRefresh() {
    this.pullFetchData(this.props)
  }

  onEndReached() {
    this.infiniteFetchData(this.props)
  }

  animate(type) {
    const value = type === 'in' ? 0 : -height;
    const callback = type === 'out' ? this.closeMenu : null
    return (
      Animated.timing(
        this.state.menuPositionY,
        {
          toValue: value,
          duration: 330
        }
      ).start(callback)
    )
  }

  render() {
    console.log(this.state.navigationState)
    return (
      <View style={styles.container}>
        {this.renderStoryLinks()}
        <TabViewAnimated
         style={tabViewStyles.container}
         navigationState={this.state.navigationState}
         renderScene={this._renderScene}
         onRequestChangeTab={this._handleChangeTab}
        />
        <Animated.View style={{transform: [{translateY: this.state.menuPositionY}]}}>
          { this.renderMenu() }
        </Animated.View>
      </View>
    )
  }

  renderMenu() {
    const { params, uiReducer } = this.props
    if (uiReducer.menu.isOpen) return <MenuContainer params={params}/>
  }

  closeMenu() {
    this.props.dispatch(MenuActions.closeMenu())
  }

  renderStory(story) {
    return <StoryContainer story={story} section={this.props.params.section} />
  }

  renderStoryLinks() {
    const { params } = this.props
    let section = params.section || {}
    let storyLinks = section.storyLinks || {}
    if (!storyLinks.open) return
    return <StoryLinksContainer story={storyLinks.story}/>
  }
}

let mapStateToProps = (state) => {
  return {
    categories: state.CategoriesReducers.categories,
    uiReducer: state.uiReducer
  }
}

export default connect(mapStateToProps)(TimelineContainer)
