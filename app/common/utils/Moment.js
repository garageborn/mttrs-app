import moment from 'moment-timezone'
import _includes from 'lodash/includes'
import 'moment/locale/pt'
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from '../../constants/Locale'
import { timezone } from '../../config/IntlProvider'

export default function (language) {
  moment.tz.setDefault(timezone)
  if (_includes(AVAILABLE_LANGUAGES), language) {
    moment.locale(language)
  } else {
    moment.locale(DEFAULT_LANGUAGE)
  }
  return moment
}
