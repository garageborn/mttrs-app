import moment from 'moment-timezone'
import { timezone } from '../../config/IntlProvider'
moment.tz.setDefault(timezone)

export default moment
