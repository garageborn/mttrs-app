import React, {PropTypes, Component} from 'react'
import { Text } from 'react-native'
import moment from '../../common/utils/Moment'
import { injectIntl, defineMessages } from 'react-intl'

const messages = defineMessages({
  lastWeek: { id: 'lastWeek' },
  lastMonth: { id: 'lastMonth' },
  recent: { id: 'recent' },
  dateFormat: { id: 'dateFormat' }
})

class ParsedDate extends Component {
  shouldComponentUpdate (nextProps) {
    return this.props.date !== nextProps.date
  }

  render () {
    let text = this.parsedDate.toUpperCase()
    return <Text style={this.props.style}>{text}</Text>
  }

  get parsedDate () {
    let { date } = this.props
    let { formatMessage, locale } = this.props.intl

    switch (date) {
      case 'last_week':
        return formatMessage(messages.lastWeek)
      case 'last_month':
        return formatMessage(messages.lastMonth)
      default:
        return moment(locale).unix(date).calendar(null, {
          sameDay: `[${formatMessage(messages.recent)}]`,
          lastDay: `[${formatMessage(messages.recent)}]`,
          lastWeek: formatMessage(messages.dateFormat),
          sameElse: formatMessage(messages.dateFormat)
        })
    }
  }
}

ParsedDate.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired
  }),
  date: PropTypes.number,
  style: PropTypes.number
}

export default injectIntl(ParsedDate)
