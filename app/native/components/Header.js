import React from 'react'
import {
  View,
  Text,
  Image,
  ScrollView
} from 'react-native'
import styles from '../styles/app'

const Header = () => {
  return (
    <View>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>

      <ScrollView
        style={styles.nav}
        contentContainerStyle={styles.navContainer}
        showsHorizontalScrollIndicator={false} horizontal>
        <Text style={styles.navItem}>All</Text>
        <Text style={styles.navItem}>World News</Text>
        <Text style={styles.navItem}>Business</Text>
        <Text style={styles.navItem}>Technlogy</Text>
        <Text style={styles.navItem}>Entertainment</Text>
        <Text style={styles.navItem}>Humor</Text>
        <Text style={styles.navItem}>Science</Text>
      </ScrollView>
    </View>
  )
}

export default Header
