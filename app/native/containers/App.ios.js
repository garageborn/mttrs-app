import React, {
  Component,
  Image,
  Linking,
  ListView,
  ScrollView,
  StatusBar,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import SafariView from 'react-native-safari-view'
import styles from 'mttrs/app/native/styles/app'
import stories from 'mttrs/app/native/assets/stories.json'

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

  openStory(storyURL) {
    SafariView.isAvailable()
      .then(
        SafariView.show({ url: storyURL, readerMode: true })
      )
      .then(
        StatusBar.setBarStyle('default')
      )
      .catch(error => {
        // iOS 8 - Fuck it?
        Linking.openURL(storyURL)
      })
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <TouchableHighlight activeOpacity={0.7} underlayColor='white' onPress={this.openStory.bind(this, rowData.url)}>
        <View style={styles.story}>
          <Image source={{uri: rowData.image.thumb}} style={styles.storyThumb} />
          <View style={styles.storyTitleContainer}>
            <Text numberOfLines={3}>{rowData.title}</Text>
            <Text style={styles.storyInfo}>@4AM <Text style={styles.storyInfoFrom}>from</Text> {rowData.publisher.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
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

        <ListView dataSource={this.dataSource} renderRow={this.renderRow.bind(this)} style={styles.storyList} />
      </View>
    )
  }
}
