import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import ButtonGroup from '../components/ButtonGroup'
import CategoryMenuContainer from './CategoryMenuContainer'
import MenuPublishers from '../components/MenuPublishers'
import styles from '../styles/Menu'
import HomeHeaderContainer from './HomeHeaderContainer'
import CategoryHeaderContainer from './CategoryHeaderContainer'
import PublisherHeaderContainer from './PublisherHeaderContainer'

class MenuContainer extends Component {
  static route = {
    navigationBar: {
      renderTitle: (route) => {
        switch(route.params.scene) {
          case 'category':
            return <CategoryHeaderContainer action='close'/>
          case 'publisher':
            return <PublisherHeaderContainer action='close'/>
          default:
            return <HomeHeaderContainer action='close'/>
        }
      }
    }
  }

  constructor () {
    super()
    this.state = {
      selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  render() {
    const buttons = ['Categories', 'Publishers']
    const { selectedIndex } = this.state
    return (
      <View style={styles.menu}>
        <View style={styles.selector}>
          <ButtonGroup
            selectedBackgroundColor='#42729B'
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons} />
        </View>

        <View style={styles.menuContainer}>
          <CategoryMenuContainer />
          {/*<MenuPublishers />*/}
        </View>
      </View>
    )
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    publisherSlug: ownProps.publisherSlug
  }
}
export default connect(mapStateToProps)(MenuContainer)
