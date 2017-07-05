import { TENANTS } from '../../constants/Tenants'

export default class Tenant {
  static get current () {
    return this._current || this.defaultTenant.id
  }

  static set current (value) {
    this._current = value
  }

  static get defaultTenant () {
    return TENANTS.find((item) => item.default)
  }

  static find (id) {
    return TENANTS.find(tenant => tenant.id === id) || this.defaultTenant
  }

  static findByCountry (country) {
    return TENANTS.find(tenant => tenant.country === country) || this.defaultTenant
  }

  static findByLanguage (language) {
    return TENANTS.find(tenant => tenant.language === language) || this.defaultTenant
  }

  static except (id) {
    return TENANTS.filter(tenant => tenant.id !== id)
  }
}
