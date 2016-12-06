import grasp from 'grasp'
import _ from 'lodash'

export default class CodeOperator {
  constructor ({code, name}) {
    this.code = code
    this.name = name
  }

  asClass (name) {
    return _.upperFirst(_.camelCase(name))
  }

  asMethod (name) {
    return _.camelCase(name)
  }

  replaceCode ({ find, replace }) {
    const replacer = grasp.replace('squery', find, replace)
    this.code = replacer(this.code)
  }

  removeNode () {
    this.replaceCode({
      find: this.find,
      replace: ''
    })
  }

  renameNode () {
    this.replaceCode({
      find: this.findNode,
      replace: this.renamedNode
    })
  }

  rename ({ name, to }) {
    this.name = name || this.name
    this.to = to
    this.renameNode()
  }

  remove ({ name }) {
    this.name = name || this.name
    this.removeNode()
  }

  add ({ name }) {
    this.name = name || this.name
    this.addNode()
  }

  at ({ clazz }) {
    this.clazz = clazz
  }
}
