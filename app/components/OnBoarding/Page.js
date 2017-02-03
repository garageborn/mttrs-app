import React, { PropTypes } from 'react'
import { View, Text, Image, Platform } from 'react-native'
import PageImage from './components/PageImage'
import PageHeader from './components/PageHeader'
import PageTitle from './components/PageTitle'
import PageText from './components/PageText'
import PageIcon from './components/PageIcon'
import PageDescription from './components/PageDescription'

const Page = ({ image, imageStyle, title, description, icon, iconStyle, ...rest }) => (
  <View style={styles.content} {...rest}>
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
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.any,
  iconStyle: PropTypes.object
}

const styles = {
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default Page
