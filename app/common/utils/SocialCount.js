import KFormat from './KFormat'

const SocialCount = number => {
  return number > 999 ? `${KFormat(number)}+` : KFormat(number)
}

export default SocialCount
