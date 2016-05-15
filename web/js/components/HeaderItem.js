import React, {Component, PropTypes} from 'react'

class HeaderItem extends Component {
  render() {
    const {category, onClick} = this.props
    return (
      <h2>
        <a onClick={e => onClick(category)}>{category.name}</a>
      </h2>
    )
  }
}

HeaderItem.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
}

export default HeaderItem
