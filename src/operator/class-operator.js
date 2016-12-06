import CodeOperator from './code-operator'

export default class ClassOperator extends CodeOperator {
  constructor ({name, code}) {
    super({name, code})
    this.type = 'class'
  }

  get nodeFind () {
    return `class-dec[id=#${this.asClass(this.name)}]`
  }

  get nodeRename () {
    return `class ${this.asClass(this.to)} {{.body}}'`
  }

  // {{}} before or after?
  get nodeAdd () {
    return `class ${this.asClass(this.name)} {
}`
  }
}
