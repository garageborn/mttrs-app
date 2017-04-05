import moment from 'moment-timezone'
import _includes from 'lodash/includes'
import 'moment/locale/pt'
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE, TIMEZONE } from '../../constants/Locale'

export default function (language) {
  moment.tz.setDefault(TIMEZONE)
  if (_includes(AVAILABLE_LANGUAGES), language) {
    moment.locale(language)
  } else {
    moment.locale(DEFAULT_LANGUAGE)
  }
  return moment
}
