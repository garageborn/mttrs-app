import moment from './Moment'

const ParseDate = (date) => {
  switch (date) {
    case 'last_week':
      return 'Last Week'
    case 'last_month':
      return 'Last Month'
    default:
      return moment.unix(date).calendar(null, {
        sameDay: '[Today]',
        lastDay: '[Yesterday]',
        lastWeek: 'MMMM D',
        sameElse: 'MMMM D'
      })
  }
}

export default ParseDate
