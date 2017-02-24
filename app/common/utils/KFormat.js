const KFormat = number => {
  return number > 999 ? Math.floor((number / 1000).toFixed(1)) + 'K' : number
}

export default KFormat
