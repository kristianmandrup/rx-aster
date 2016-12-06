import CodeOperator from './code-operator'

export default class MethodOperator extends CodeOperator {
  constructor ({name, code}) {
    super({name, code})
    this.type = 'method'
  }

  get findNode () {
    return `method[key=#${this.name}]`
  }

  get renamedNode () {
    return `${this.to} {{.value}}`
  }

  // {{}} before or after?
  get addNode () {
    return `${this.asMethod(this.name)} {
}`
  }
}
