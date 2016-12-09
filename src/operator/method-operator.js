import CodeOperator from './code-operator'

export default class MethodOperator extends CodeOperator {
  constructor ({name, className, code}) {
    super({name, code})
    this.where({ className })
    this.type = 'method'
  }

  set name (name) {
    this._name = this.asMethod(name)
  }

  set to (name) {
    this._to = this.asMethod(name)
  }

  get newName () {
    return this._to
  }

  get name () {
    return this._name
  }

  get methodName () {
    return this.name
  }

  where ({ className }) {
    this.className = this.asClass(className)
    return this
  }

  get nodeFind () {
    return `${this.nodeFindClass} method[key=#${this.methodName}]`
  }

  get nodeFindClass () {
    return this.className ? `class-dec[id=#${this.className}]` : ''
  }

  get nodeFindClassBody () {
    return `${this.nodeFindClass} body[type=#ClassBody]`
  }

  get nodeRename () {
    return `${this.newName} {{.value}}`
  }

  // {{}} before or after?
  get nodeAdd () {
    return `class ${this.className} {{ .body }}`
  }

  get newMethod () {
    return `${this.methodName}() {}`
  }

  addNode () {
    return this.replaceCodeFn({
      find: this.nodeFindClassBody,

        // getRaw: a function which takes a node object and produces a string
        // node: the node that was matched (and is being replaced)
        // query: a function which queries using the same query engine as the original search, and using the matched node as the root
        // named: an object containing any named matches
      replaceFn: (getRaw, node, query, named) => {
        var body = query('.body');
        body.push({
          type: 'Raw',
          raw: this.newMethod
        })
        return getRaw(body)
      }
    })
  }
}
