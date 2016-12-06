export default class ClassOperator {
  constructor ({name, code}) {
    this.code = code
    this.name = name
    this.type = 'class'
  }

  get findNode () {
    return `class-dec[id=#${this.asClass(this.name)}]`
  }

  get renamedNode () {
    return `class ${this.asClass(this.to)} {{.body}}'`
  }

  // {{}} before or after?
  get addNode () {
    return `class ${this.asClass(this.name)} {
}`
  }
}
