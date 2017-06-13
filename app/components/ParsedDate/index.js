import React, { PropTypes } from 'react'
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

const ParsedDate = ({ date, intl, style, type }) => {
  const parsedDate = () => {
    let { formatMessage, locale } = intl

    switch (date) {
      case 'last_week':
        return formatMessage(messages.lastWeek)
      case 'last_month':
        return formatMessage(messages.lastMonth)
      default:
        return moment(locale).unix(date).calendar(null, {
          sameDay: `[${formatMessage(getMessage('sameDay'))}]`,
          lastDay: `[${formatMessage(getMessage('yesterday'))}]`,
          lastWeek: formatMessage(messages.dateFormat),
          sameElse: formatMessage(messages.dateFormat)
        })
    }
  }

  const getMessage = (day) => {
    const daysMessages = { sameDay: messages.today, yesterday: messages.yesterday }
    if (type === 'summaries') return messages.recent
    return daysMessages[day]
  }

  let text = parsedDate().toUpperCase()
  return <Text style={style}>{text}</Text>
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
