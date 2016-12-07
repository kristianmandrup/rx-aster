import CodeOperator from './code-operator'

export default class FunctionOperator extends CodeOperator {
  constructor ({name, args, code}) {
    super({name, code})
    this.args = args && Array.isArray(args) ? args.join(', ') : ''
    this.type = 'function'
  }

  get nodeFind () {
    return `fun-dec[id=#${this.name}]`
  }

  get nodeRename () {
    return `function ${this.to} ({{.params}}) {{.body}}`
  }

  // {{}} before or after?
  get nodeAdd () {
    return `function ${this.name} (${this.args}) {
}`
  }
}
