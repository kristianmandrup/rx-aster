import CodeOperator from './code-operator'

export default class MethodOperator extends CodeOperator {
  constructor ({name, clazz, code}) {
    super({name, code})
    this.clazz = clazz
    this.type = 'method'
  }

  clazz ({ name }) {
    this.clazz = name
  }

  get findNode () {
    return `class-dec[id=#${this.asClass(this.clazz)}] method[key=#${this.name}]`
  }

  get renamedNode () {
    return `${this.to} {{.value}}`
  }

  // {{}} before or after?
  get addNode () {
    return `{{}} ${this.asMethod(this.name)} {
}`
  }
}
