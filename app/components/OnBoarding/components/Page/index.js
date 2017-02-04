import React, { PropTypes } from 'react'
import { View } from 'react-native'
import PageDescription from '../PageDescription'
import PageHeader from '../PageHeader'
import PageImage from '../PageImage'
import PageTitle from '../PageTitle'
import PageText from '../PageText'
import PageIcon from '../PageIcon'
import styles from './styles'

const Page = ({
  image,
  imageStyle,
  icon,
  iconStyle,
  title,
  description,
  ...rest
}) => (
  <View style={styles.page} {...rest}>
    <PageImage source={image} imageStyle={imageStyle} />
    <PageText>
      <PageHeader>
        <PageTitle>{title}</PageTitle>
        {icon && <PageIcon source={icon} />}
      </PageHeader>
      <PageDescription>
        {description}
      </PageDescription>
    </PageText>
  </View>
)

Page.propTypes = {
  image: PropTypes.any.isRequired,
  imageStyle: PropTypes.object,
  icon: PropTypes.any,
  iconStyle: PropTypes.object,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default Page
