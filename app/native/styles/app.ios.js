import React from 'react'
import {StyleSheet} from 'react-native'

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
})

export default styles
