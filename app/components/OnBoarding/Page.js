import React, { PropTypes } from 'react'
import { View, Text, Image, Platform } from 'react-native'
import PageImage from './components/PageImage'
import PageTitle from './components/PageTitle'

const PageContent = ({ children }) => (
  <View style={styles.content}>
    <View style={{flex: 0}}>
      {children}
    </View>
  </View>
)

const Page = ({ image, imageStyle, title, description, icon, iconStyle, width, ...rest }) => (
  <View {...rest}>
    <PageContent>
      {/* <View style={styles.image}>
        <Image resizeMethod='resize' source={image} style={{ ...imageStyle, width: width }} />
      </View> */}
      <PageImage source={image} imageStyle={imageStyle} />
      <View style={[styles.textContainer, { width }]}>
        <View style={styles.headerContainer}>
          {/* <Text style={styles.title}>{title}</Text> */}
          <PageTitle title={title} />
          <View style={iconStyle}>
            {icon}
          </View>
        </View>
        <Text style={styles.subTitle}>
          {description}
        </Text>
      </View>
    </PageContent>
  </View>
)

PageContent.propTypes = {
  children: PropTypes.node.isRequired
}

Page.propTypes = {
  image: PropTypes.any.isRequired,
  imageStyle: PropTypes.object,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.any,
  iconStyle: PropTypes.object,
  width: PropTypes.number.isRequired
}

const styles = {
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  textContainer: {
    flexWrap: 'wrap',
    backgroundColor: '#FFF',
    paddingHorizontal: 25,
    height: Platform.select({
      ios: 180,
      android: 120
    })
  },

  headerContainer: {
    paddingVertical: Platform.select({
      ios: 20,
      android: 18
    }),
    flexDirection: 'row'
  },

  image: {
    flex: 1,
    alignItems: 'center'
  },

  title: {
    fontSize: Platform.select({
      ios: 24,
      android: 18
    }),
    fontWeight: '500',
    color: '#999'
  },

  subTitle: {
    fontSize: 14,
    color: '#999'
  }
}

export default Page
