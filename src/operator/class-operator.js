import CodeOperator from './code-operator'

export default class ClassOperator extends CodeOperator {
  constructor ({name, code}) {
    super({name, code})
    this.type = 'class'
  }

  set name (name) {
    this._name = this.asClass(name)
  }

  set to (name) {
    this._to = this.asClass(name)
  }

  get name () {
    return this._name
  }

  get newName () {
    return this._to
  }

  get nodeFind () {
    return `class-dec[id=#${this.name}]`
  }

  get nodeRename () {
    return `class ${this.newName} {{.body}}'`
  }

  // {{}} before or after?
  get nodeAdd () {
    return `class ${this.name} {
}`
  }
}
