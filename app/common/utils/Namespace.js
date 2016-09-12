import { NAMESPACES } from '../../constants/Namespaces'

export default class Namespace {
  static get current() {
    return this._current
  }

  static set current(value) {
    this._current = value
  }

  static fromDomain(domain) {
    let namespace = NAMESPACES.find((item) => {
      return item.domain.test(domain)
    })
    if (!namespace) namespace = NAMESPACES[0]

    this.current = namespace.id
  }
}
