import React from 'react'
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  header: {
    backgroundColor: '#2C2E4A',
    paddingTop: 28,
    alignItems: 'center'
  },

  logo: {
    width: 113,
    height: 28,
    marginBottom: 12
  },

  nav: {
    backgroundColor: '#EA4340',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#EA4340',
    padding: 12
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
})

export default styles
