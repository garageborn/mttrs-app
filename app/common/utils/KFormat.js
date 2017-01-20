const KFormat = number => {
  return number > 999 ? (number / 1000).toFixed(1) + 'K' : number
}

export default KFormat
