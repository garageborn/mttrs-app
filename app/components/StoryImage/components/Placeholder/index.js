import React, { PropTypes } from 'react'
import { Image } from 'react-native'
import styles from '../../styles'

const firstPlaceholder = require('./assets/placeholder-01.png')
const secondPlaceholder = require('./assets/placeholder-02.png')
const thirdPlaceholder = require('./assets/placeholder-03.png')
const fourthPlaceholder = require('./assets/placeholder-04.png')
const fifthPlaceholder = require('./assets/placeholder-05.png')

const placeholders = [
  firstPlaceholder, firstPlaceholder,
  secondPlaceholder, secondPlaceholder,
  thirdPlaceholder, thirdPlaceholder,
  fourthPlaceholder, fourthPlaceholder,
  fifthPlaceholder, fifthPlaceholder
]

const Placeholder = ({ story }) => {
  const getPlaceholder = () => {
    const lastDigit = story.id % 10
    return placeholders[lastDigit]
  }

  return <Image style={styles.image} resizeMode='cover' source={getPlaceholder()} />
}

Placeholder.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.any.isRequired
  }).isRequired
}

export default Placeholder
