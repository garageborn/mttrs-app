import _ from 'lodash'
import Namespace from '../../common/utils/Namespace'

export default class Setup {
  static run(request) {
    this.namespace(request)
  }

  static namespace(request) {
    let domain = request.headers.host.split(':')[0]
    Namespace.fromDomain(domain)
  }
}
