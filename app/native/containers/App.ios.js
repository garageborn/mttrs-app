import React, { Component } from 'react'
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  View
} from 'react-native'
import SafariView from 'react-native-safari-view'
import styles from '../styles/app'
import Header from '../components/Header'
// import StoryList from './StoryList'
// import {Provider} from 'react-redux'
// import configureStore from '../store/configureStore'
// const store = configureStore()

export default class App extends Component {
  constructor (props) {
    super(props)
    StatusBar.setBarStyle('light-content')

    this.dismissSubscription = () => {
      StatusBar.setBarStyle('light-content')
    }

    SafariView.addEventListener('onDismiss', this.dismissSubscription)
  }

  render () {
    return (
      <View style={styles.container}>
        <Header />
      </View>
    )
  }
}
