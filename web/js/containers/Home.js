import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as HomeActions from 'actions/HomeActions'
import Header from 'containers/Header'
import StoryListContainer from 'containers/StoryListContainer'

class Home extends Component {
  componentDidMount() {
    const {dispatch, filter} = this.props
    dispatch(HomeActions.getStories(filter))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filter !== this.props.filter) {
      this.props.dispatch(HomeActions.getStories(nextProps.filter))
    }
  }

  render() {
    const {stories} = this.props
    return (
      <div>
        <Header />
        <StoryListContainer stories={stories}/>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    ...state.HomeReducers,
    filter: state.FilterReducers.filter
  }
}
export default connect(mapStateToProps)(Home)

// export default connect(state => state.HomeReducers)(Home)
