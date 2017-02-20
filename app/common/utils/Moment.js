import moment from 'moment-timezone'
import 'moment/locale/pt'
import { timezone } from '../../config/IntlProvider'

moment.tz.setDefault(timezone)

export default moment
