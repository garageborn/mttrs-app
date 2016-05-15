import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as HomeActions from 'actions/HomeActions'
import Header from 'containers/Header'
import StoryListContainer from 'containers/StoryListContainer'

class Home extends Component {
  componentDidMount() {
    const {dispatch} = this.props
    dispatch(HomeActions.getStories())
  }

  render() {
    const {stories} = this.props
    return (
      <main>
        <Header />
        <StoryListContainer stories={stories}/>
      </main>
    )
  }
}

export default connect(state => state.HomeReducers)(Home)
