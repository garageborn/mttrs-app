import React, {
  Component,
  Linking,
  ListView,
  StatusBar
} from 'react-native'
import SafariView from 'react-native-safari-view'
import styles from 'mttrs/app/native/styles/app'
import Story from 'mttrs/app/native/components/Story'
import {connect} from 'react-redux'
import * as StoryActions from 'mttrs/app/actions/StoryActions'

class StoryList extends Component {
  componentDidMount() {
    this.fetchCategory(this.props)
  }

  render() {
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={this.renderRow.bind(this)}
        style={styles.storyList}
        />
    )
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <Story story={rowData} onClick={this.openStory.bind(this)} />
    )
  }

  get dataSource() {
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    return ds.cloneWithRows(this.props.stories.slice(0, 20))
  }

  openStory(story) {
    SafariView.isAvailable()
      .then(
        SafariView.show({ url: story.url, readerMode: true })
      )
      .then(
        StatusBar.setBarStyle('default')
      )
      .catch(error => {
        // iOS 8 - Fuck it?
        Linking.openURL(story.url)
      })
  }

  fetchCategory(props = this.props) {
    // let categorySlug = props.params.slug
    // let filter = props.filter

    // this.props.dispatch(CategoryActions.getCategory(categorySlug))

    let options = {}
    // if (categorySlug) options.category_slug = categorySlug
    // if (filter) options[filter] = true
    this.props.dispatch(StoryActions.getStories(options))
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    // category: state.CategoriesReducers.category,
    stories: state.StoryReducers.stories,
    // filter: ownProps.route.filter
  }
}
export default connect(mapStateToProps)(StoryList)
