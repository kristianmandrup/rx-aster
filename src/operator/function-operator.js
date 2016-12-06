import CodeOperator from './code-operator'

export default class FunctionOperator extends CodeOperator {
  constructor ({name, args, code}) {
    super({name, code})
    this.args = args && Array.isArray(args) ? args.join(', ') : ''
    this.type = 'function'
  }

  get findNode () {
    return `fun-dec[id=#${this.name}]`
  }

  get renamedNode () {
    return `function ${this.to} ({{.params}}) {{.body}}`
  }

  // {{}} before or after?
  get addNode () {
    return `function ${this.name} (${this.args}) {
}`
  }
}
