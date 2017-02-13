import React, {PropTypes, Component} from 'react'
import { Text } from 'react-native'
import moment from '../../common/utils/Moment'
import { injectIntl, defineMessages } from 'react-intl'

const messages = defineMessages({
  lastWeek: {
    id: 'lastWeek'
  },
  lastMonth: {
    id: 'lastMonth'
  },
  today: {
    id: 'today'
  },
  yesterday: {
    id: 'yesterday'
  },
  dateFormat: {
    id: 'dateFormat'
  }
})

class ParsedDate extends Component {
  parser (date) {
    let { intl } = this.props
    switch (date) {
      case 'last_week':
        return intl.formatMessage(messages.lastWeek)
      case 'last_month':
        return intl.formatMessage(messages.lastMonth)
      default:
        return moment.unix(date).calendar(null, {
          sameDay: `[${intl.formatMessage(messages.today)}]`,
          lastDay: `[${intl.formatMessage(messages.yesterday)}]`,
          lastWeek: intl.formatMessage(messages.dateFormat),
          sameElse: intl.formatMessage(messages.dateFormat)
        })
    }
  }

  render () {
    let { date } = this.props
    let parsedDate = this.parser(date)
    let text = parsedDate.toUpperCase()
    return (
      <Text style={this.props.style}>{text}</Text>
    )
  }
}

ParsedDate.propTypes = {
  date: PropTypes.number,
  style: PropTypes.number
}

export default injectIntl(ParsedDate)
