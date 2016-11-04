import Tenant from '../../common/utils/Tenant'

export default class Setup {
  static fromRequest(request) {
    this.tenant(request.headers.host)
  }

  static fromWindow(window) {
    this.tenant(window.location.host)
  }

  static tenant(host) {
    let domain = host.split(':')[0]
    Tenant.fromDomain(domain)
  }
}
