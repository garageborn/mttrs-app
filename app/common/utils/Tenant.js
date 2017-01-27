import { TENANTS } from '../../constants/Tenants'

export default class Tenant {
  static get current () {
    return this._current || this.defaultTenant.id
  }

  static set current (value) {
    this._current = value
  }

  static get defaultTenant () {
    return TENANTS.find((item) => { return item.default })
  }
}
