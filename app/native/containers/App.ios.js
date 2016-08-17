import React, { Component } from 'react'
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native'
import SafariView from 'react-native-safari-view'
import styles from '../styles/app'
// import StoryList from './StoryList'
// import {Provider} from 'react-redux'
// import configureStore from '../store/configureStore'
// const store = configureStore()

export default class App extends Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle('light-content')

    this.dismissSubscription = () => {
      StatusBar.setBarStyle("light-content")
    }

    SafariView.addEventListener("onDismiss", this.dismissSubscription)
  }

  render() {
    return (
      // <Provider store={store}>
        <View style={styles.container}>
          <View>
            <View style={styles.header}>
              <Image source={require('mttrs/app/native/assets/logo.png')} style={styles.logo} />
            </View>

            <ScrollView style={styles.nav} contentContainerStyle={styles.navContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
              <Text style={styles.navItem}>All</Text>

              <Text style={styles.navItem} style={styles.navItem} style={styles.navItem} style={styles.navItem}>World News</Text>

              <Text style={styles.navItem} style={styles.navItem} style={styles.navItem}>Business</Text>

              <Text style={styles.navItem} style={styles.navItem}>Technlogy</Text>

              <Text style={styles.navItem}>Entertainment</Text>

              <Text style={styles.navItem}>Humor</Text>

              <Text style={styles.navItem}>Science</Text>
            </ScrollView>
          </View>

          {/* <StoryList /> */}
        </View>
      // </Provider>
    )
  }
}
