const KFormat = number => {
  return number > 999 ? (number / 1000).toFixed(1) + 'k' : number
}

export default KFormat
