import React, {PropTypes, Component} from 'react'
import { Text } from 'react-native'
import moment from '../../common/utils/Moment'
import { injectIntl, defineMessages } from 'react-intl'

const messages = defineMessages({
  lastWeek: { id: 'lastWeek' },
  lastMonth: { id: 'lastMonth' },
  today: { id: 'today' },
  yesterday: { id: 'yesterday' },
  dateFormat: { id: 'dateFormat' },
  recent: { id: 'recent' }
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
          sameDay: `[${formatMessage(this.getMessage('sameDay'))}]`,
          lastDay: `[${formatMessage(this.getMessage('yesterday'))}]`,
          lastWeek: formatMessage(messages.dateFormat),
          sameElse: formatMessage(messages.dateFormat)
        })
    }
  }

  getMessage (day) {
    const daysMessages = {
      sameDay: messages.today,
      yesterday: messages.yesterday
    }
    if (this.props.type === 'summaries') return messages.recent
    return daysMessages[day]
  }
}

ParsedDate.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired
  }),
  date: PropTypes.number,
  style: PropTypes.number,
  type: PropTypes.string
}

export default injectIntl(ParsedDate)
