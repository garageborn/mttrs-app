import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _result from 'lodash/result'
import _parseInt from 'lodash/parseInt'
import { FavoritePublishersActions } from '../../actions'
import { COLORLESS } from '../../constants/TouchUnderlayColors'
import Touchable from '../../components/Touchable'

class ToggleFavoriteContainer extends Component {
  constructor () {
    super()
    this.toggle = this.toggle.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { handleFavoriteState } = this.props
    if (!handleFavoriteState) return
    if (this.props.isFavorite !== nextProps.isFavorite) handleFavoriteState(nextProps.isFavorite)
  }

  shouldComponentUpdate (nextProps) {
    return this.props.isFavorite !== nextProps.isFavorite
  }

  render () {
    const { isFavorite, addComponent, removeComponent } = this.props
    const component = isFavorite ? removeComponent : addComponent

    return (
      <Touchable underlayColor={COLORLESS} onPress={this.toggle}>
        {component}
      </Touchable>
    )
  }

  toggle () {
    const { dispatch, isFavorite, publisher } = this.props
    if (isFavorite) {
      dispatch(FavoritePublishersActions.removePublisher(publisher))
    } else {
      dispatch(FavoritePublishersActions.addPublisher(publisher))
    }
  }
}

ToggleFavoriteContainer.propTypes = {
  addComponent: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleFavoriteState: PropTypes.func,
  removeComponent: PropTypes.element.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  publisher: PropTypes.shape({
    id: PropTypes.any.isRequired
  }).isRequired
}

const mapStateToProps = (state, ownProps) => {
  const publisherId = _parseInt(_result(ownProps, 'publisher.id'))
  const isFavorite = state.FavoritePublishersReducer.items.indexOf(publisherId) !== -1

  return { isFavorite }
}

export default connect(mapStateToProps)(ToggleFavoriteContainer)
