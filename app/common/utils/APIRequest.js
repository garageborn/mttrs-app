import request from 'superagent'
import Tenant from './Tenant'

export default function(method, url) {
  console.log('----------', Tenant.current, url)
  return request(method, url).set('X-Tenant', Tenant.current)
}
