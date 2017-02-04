import React, { Component, PropTypes } from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
import Page from './Page'
import Paginator from './components/Paginator'
import data from './data'

class Onboarding extends Component {
  state = {
    currentPage: 0
  }

  updatePosition = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent
    const pageFraction = contentOffset.x / layoutMeasurement.width
    const page = Math.round(pageFraction)
    const isLastPage = data.length === page + 1
    if (isLastPage && pageFraction - page > 0.3) {
      this.props.onEnd()
    } else {
      this.setState({currentPage: page})
    }
  }

  render () {
    const { width } = Dimensions.get('window')

    return (
      <View style={{flex: 1, backgroundColor: '#F1F1F1', justifyContent: 'center'}}>
        <ScrollView
          ref='scroll'
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={this.updatePosition}
          scrollEventThrottle={100}
        >
          {data.map((pg, id) => (
            <Page key={id} image={pg.image} imageStyle={pg.imageStyle} title={pg.title} description={pg.description} icon={pg.icon} iconStyle={pg.iconStyle} width={width} />
          ))}
        </ScrollView>
        <Paginator
          pages={data.length}
          currentPage={this.state.currentPage}
          onEnd={this.props.onEnd}
        />
      </View>
    )
  }
}

Onboarding.propTypes = {
  onEnd: PropTypes.func.isRequired
}

export default Onboarding
