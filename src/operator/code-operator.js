import grasp from 'grasp'
import _ from 'lodash'

export default class CodeOperator {
  constructor ({code, name}) {
    // console.log('CodeOperator:: code:', code, 'name:', name)
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
    find = find || this.nodeFind
    const replacer = grasp.replace('squery', find, replace)
    console.log('find:', find, 'replace:', replace, 'code:', this.code)
    this.code = replacer(this.code)
    return this
  }

  insertCode ({ replace }) {
    this.code = [this.code, replace].join('\n')
    return this
  }

  removeNode () {
    return this.replaceCode({
      replace: ''
    })
  }

  renameNode () {
    return this.replaceCode({
      replace: this.nodeRename
    })
  }

  addNode () {
    return this.insertCode({
      replace: this.nodeAdd
    })
  }

  rename ({ name, to }) {
    this.name = name || this.name
    this.to = to
    return this.renameNode()
  }

  remove ({ name }) {
    this.name = name || this.name
    return this.removeNode()
  }

  add ({ name }) {
    this.name = name || this.name
    return this.addNode()
  }
}
