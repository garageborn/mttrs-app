import React, {Component, PropTypes} from 'react'

class NavItem extends Component {
  render() {
    const {category, isSelected, onClick} = this.props
    return (
      <li>
        {isSelected
          ? <span className="active">{category.name}</span>
          : <a onClick={e => onClick(category)}>{category.name}</a>
        }
      </li>
    )
  }
}

NavItem.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default NavItem
