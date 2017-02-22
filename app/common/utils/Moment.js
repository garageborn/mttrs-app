import moment from 'moment-timezone'
import 'moment/locale/pt'
import { timezone, language } from '../../config/IntlProvider'

if (language === 'pt') {
  moment.locale('pt')
} else {
  moment.locale('en')
}

moment.tz.setDefault(timezone)

export default moment
