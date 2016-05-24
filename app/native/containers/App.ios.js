import React, {
  Component,
  Image,
  Linking,
  ListView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native'
import SafariView from 'react-native-safari-view'
import styles from 'mttrs/app/native/styles/app'
import stories from 'mttrs/app/native/assets/stories.json'
import Story from 'mttrs/app/native/components/Story'

export default class App extends Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle('light-content')

    this.dismissSubscription = () => {
      StatusBar.setBarStyle("light-content")
    }

    SafariView.addEventListener("onDismiss", this.dismissSubscription)
  }

  get dataSource() {
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    return ds.cloneWithRows(stories.slice(0, 20))
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

  renderRow(rowData, sectionId, rowId) {
    return (
      <Story story={rowData} onClick={this.openStory.bind(this)} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <Image source={require('mttrs/app/native/assets/mttrs.png')} style={styles.logo} />
          </View>

          <ScrollView style={styles.nav} contentContainerStyle={styles.navContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
            <Image source={require('mttrs/app/native/assets/bullet.png')} style={styles.navBullet} />
            <Text style={styles.navItem}>All</Text>

            <Image source={require('mttrs/app/native/assets/bullet.png')} style={styles.navBullet} />
            <Text style={styles.navItem} style={styles.navItem} style={styles.navItem} style={styles.navItem}>World News</Text>

            <Image source={require('mttrs/app/native/assets/bullet.png')} style={styles.navBullet} />
            <Text style={styles.navItem} style={styles.navItem} style={styles.navItem}>Business</Text>

            <Image source={require('mttrs/app/native/assets/bullet.png')} style={styles.navBullet} />
            <Text style={styles.navItem} style={styles.navItem}>Technlogy</Text>

            <Image source={require('mttrs/app/native/assets/bullet.png')} style={styles.navBullet} />
            <Text style={styles.navItem}>Entertainment</Text>

            <Image source={require('mttrs/app/native/assets/bullet.png')} style={styles.navBullet} />
            <Text style={styles.navItem}>Humor</Text>

            <Image source={require('mttrs/app/native/assets/bullet.png')} style={styles.navBullet} />
            <Text style={styles.navItem}>Science</Text>
          </ScrollView>
        </View>

        <ListView
          dataSource={this.dataSource}
          renderRow={this.renderRow.bind(this)}
          style={styles.storyList}
          />
      </View>
    )
  }
}
