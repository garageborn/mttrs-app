import React, { Component, PropTypes } from 'react'
import { Image } from 'react-native'
import { NavigationActions } from '@exponent/ex-navigation'
import Header from '../components/Header'
import * as cloudinary from '../../common/utils/Cloudinary'

class CategoryHeaderContainer extends Component {
  getCategoryIcon() {
    const { icon_id } = this.props.category
    if (!icon_id) return
    let options = {
      secure: true,
      effect: 'colorize',
      color: '#FFF',
      width: 40,
      height: 40,
      crop: 'crop'
    }
    const uri = cloudinary.id(icon_id, options)
    return { uri }
  }

  render() {
    const { toggleMenu, category } = this.props
    return (
      <Header
        title={category.name}
        toggleMenu={toggleMenu}
        icon={this.getCategoryIcon()}
        />
    )
  }
}

CategoryHeaderContainer.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  toggleMenu: PropTypes.func.isRequired
}

export default CategoryHeaderContainer
