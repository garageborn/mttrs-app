import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ListView,
  StatusBar,
  Linking
} from 'react-native';
import stories from './stories.json'

class mttrs extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View>
          <View style={styles.header}>
            <Image source={require('./img/mttrs.png')} style={styles.logo} />
          </View>

          <ScrollView style={styles.nav} contentContainerStyle={styles.navContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
            <Image source={require('./img/bullet.png')} style={styles.navBullet} />
            <Text style={styles.navItem}>All</Text>

            <Image source={require('./img/bullet.png')} style={styles.navBullet} />
            <Text style={styles.navItem} style={styles.navItem} style={styles.navItem} style={styles.navItem}>World News</Text>

            <Image source={require('./img/bullet.png')} style={styles.navBullet} />
            <Text style={styles.navItem} style={styles.navItem} style={styles.navItem}>Business</Text>

            <Image source={require('./img/bullet.png')} style={styles.navBullet} />
            <Text style={styles.navItem} style={styles.navItem}>Technlogy</Text>

            <Image source={require('./img/bullet.png')} style={styles.navBullet} />
            <Text style={styles.navItem}>Entertainment</Text>

            <Image source={require('./img/bullet.png')} style={styles.navBullet} />
            <Text style={styles.navItem}>Humor</Text>

            <Image source={require('./img/bullet.png')} style={styles.navBullet} />
            <Text style={styles.navItem}>Science</Text>
          </ScrollView>
        </View>

        <ListView dataSource={this.dataSource} renderRow={this.renderRow} style={styles.storyList} />
      </View>
    );
  }

  get dataSource() {
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    return ds.cloneWithRows(stories.slice(0, 20))
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <View style={styles.story}>
        <Image source={{uri: rowData.image.thumb}} style={styles.storyThumb} />
        <View style={styles.storyTitleContainer}>
          <Text numberOfLines={2} onPress={() => Linking.openURL(rowData.url)}>{rowData.title}</Text>
          <Text style={styles.storyInfo}>@4AM <Text style={styles.storyInfoFrom}>from</Text> {rowData.publisher.name}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  header: {
    backgroundColor: '#ff5607',
    paddingTop: 27,
    alignItems: 'center'
  },

  logo: {
    width: 113,
    height: 28,
    marginBottom: 12
  },

  nav: {
    backgroundColor: '#ff5607',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#EB4F06',
    padding: 11
  },

  navItem: {
    color: '#fff',
    marginRight: 14,
    fontSize: 15
  },

  navBullet: {
    marginTop: 6,
    marginRight: 4,
    width: 7,
    height: 7
  },

  storyList: {

  },

  story: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row'
  },

  storyThumb: {
    width: 100,
    height: 75,
    marginRight: 10
  },

  storyTitleContainer: {
    flex: 1,
    justifyContent: 'center'
  },

  storyInfo: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#aaa',
    fontSize: 12
  },

  storyInfoFrom: {
    fontWeight: 'normal'
  }
});

AppRegistry.registerComponent('mttrs', () => mttrs);