import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import _parseInt from 'lodash/parseInt'
import FavoritePublisherSelector from '../../components/FavoritePublisherSelector'
import { FavoritesActions } from '../../actions/index'

class FavoritePublisherSelectorContainer extends Component {
  constructor () {
    super()
    this.toggle = this.toggle.bind(this)
  }

  render () {
    const { publisher, selected } = this.props

    return (
      <FavoritePublisherSelector
        onPress={this.toggle}
        publisher={publisher}
        selected={selected}
      />
    )
  }

  toggle () {
    let { dispatch, publisher, selected } = this.props
    if (selected) {
      dispatch(FavoritesActions.selectPublisher())
    } else {
      dispatch(FavoritesActions.selectPublisher(publisher))
    }
  }
}

FavoritePublisherSelectorContainer.propTypes = {
  publisher: PropTypes.shape({
    id: PropTypes.any.isRequired,
    icon_id: PropTypes.string
  }).isRequired,
  selected: PropTypes.bool.isRequired
}

let mapStateToProps = (state, ownProps) => {
  return {
    selected: state.FavoritesReducer.publisherId === _parseInt(ownProps.publisher.id)
  }
}

export default connect(mapStateToProps)(FavoritePublisherSelectorContainer)
