import { TENANTS } from '../../constants/Tenants'

export default class Tenant {
  static get current() {
    return this._current
  }

  static set current(value) {
    this._current = value
  }

  static fromDomain(domain) {
    let tenant = TENANTS.find((item) => {
      return item.domain.test(domain)
    })
    if (!tenant) tenant = this.defaultTenant

    this.current = tenant.id
  }

  static get defaultTenant() {
    return TENANTS.find((item) => { return item.default })
  }
}
