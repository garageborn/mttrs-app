import _compact from 'lodash/compact'
import _flatten from 'lodash/flatten'
import _map from 'lodash/map'
import _parseInt from 'lodash/parseInt'
import _uniq from 'lodash/uniq'

const parseArrayParam = (items, defaultValue = null) => {
  let array = _flatten(items)
  array = _map(array, _parseInt)
  array = _compact(array)
  array = _uniq(array)
  array = array.sort()
  return array.length ? array : defaultValue
}

export default parseArrayParam
