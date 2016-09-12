import request from 'superagent'
import Namespace from './Namespace'

export default function(method, url) {
  return request(method, url).set('X-Namespace', Namespace.current)
}
