'use strict'

var estraverse = require('estraverse')

// monkey-patch for estraverse to accept File nodes
estraverse.Syntax.File = 'File'
estraverse.VisitorKeys.File = ['program']

function traverse (options) {
  var replace = !!(options && options.replace)

  return function (files) {
    if (!replace) {
      return files.do(function (file) {
        estraverse.traverse(file, options)
      })
    } else {
      return files.map(function (file) {
        return estraverse.replace(file, options)
      })
    }
  }
}

Object.keys(estraverse.VisitorOption).forEach(function (key) {
  Object.defineProperty(traverse, key, {
    enumerable: true,
    value: estraverse.VisitorOption[key]
  })
})

module.exports = traverse
