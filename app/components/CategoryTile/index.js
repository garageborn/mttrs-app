/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react'
import { View, Text, Image } from 'react-native'
import Touchable from '../Touchable'
import LinearGradient from 'react-native-linear-gradient'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import * as cloudinary from '../../common/utils/Cloudinary'
import styles from './styles'

const CategoryTile = ({ onPress, category }) => {
  let image = () => {
    if (!category.image_id) return

    return cloudinary.id(category.image_id, { secure: true })
  }

  return (
    <View style={styles.container}>
      <Touchable underlayColor={WHITE_TRANSPARENT_COLOR} onPress={e => onPress(category)}>
        <View style={[styles.category, { borderBottomColor: category.color }]} shadowOffset={{width: 0, height: 2}} shadowColor={'rgba(0, 0, 0, 1)'} shadowOpacity={0.5} elevation={1}>
          <Image style={styles.image} source={{uri: image()}}>
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.5)']}
              style={styles.gradient}
            >
              <Text style={styles.name} numberOfLines={2}>{category.name}</Text>
            </LinearGradient>
          </Image>
        </View>
      </Touchable>
    </View>
  )
}

CategoryTile.propTypes = {
  category: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired
}

export default CategoryTile
