import _ from 'lodash'
import Tenant from '../../common/utils/Tenant'

export default class Setup {
  static run(request) {
    this.tenant(request)
  }

  static tenant(request) {
    let domain = request.headers.host.split(':')[0]
    Tenant.fromDomain(domain)
  }
}
