import { stringify } from './Parser'

const KFormat = number => {
  return number > 999 ? `${Math.floor((number / 1000).toFixed(1))}K` : stringify(number)
}

export default KFormat
