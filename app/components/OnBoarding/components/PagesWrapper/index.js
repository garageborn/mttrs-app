import React, { Component, PropTypes } from 'react'
import { View, ScrollView } from 'react-native'
import Paginator from '../Paginator'
import styles from './styles'

class PagesWrapper extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentPage: 0,
      numberOfPages: React.Children.count(props.children)
    }
  }

  updatePosition = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent
    const pageFraction = contentOffset.x / layoutMeasurement.width
    const page = Math.round(pageFraction)
    const isLastPage = this.state.numberOfPages === page + 1
    if (isLastPage && pageFraction - page > 0.3) {
      this.props.onEnd()
    } else {
      this.setState({currentPage: page})
    }
  }

  render () {
    const numberOfPages = React.Children.count(this.props.children)

    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          pagingEnabled
          onScroll={this.updatePosition}
          scrollEventThrottle={100}
          showsHorizontalScrollIndicator={false}
        >
          {this.props.children}
        </ScrollView>
        <Paginator
          pages={numberOfPages}
          currentPage={this.state.currentPage}
          onEnd={this.props.onEnd}
        />
      </View>
    )
  }
}

PagesWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  onEnd: PropTypes.func.isRequired
}

export default PagesWrapper
