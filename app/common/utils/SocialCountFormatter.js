import KFormat from './KFormat'

export default number => {
  return number > 999 ? `${KFormat(number)}+` : KFormat(number)
}
