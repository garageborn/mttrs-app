import React, {Component, PropTypes} from 'react'

class HeaderItem extends Component {
  render() {
    const {category, isSelected, onClick} = this.props
    return (
      <h2>
        {isSelected
          ? <span>{category.name}**</span>
          : <a onClick={e => onClick(category)}>{category.name}</a>
        }
      </h2>
    )
  }
}

HeaderItem.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default HeaderItem
