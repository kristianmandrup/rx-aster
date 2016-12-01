'use strict'

var Rx = require('rx')
var escodegen = require('escodegen')

function defaultGenerator (options) {
  return function (files) {
    return files.flatMap(function (file) {
      var result = escodegen.generate(file.program, options)

      var code = result.code
      var map = result.map

      var fileName = file.loc.source
      var files = []

      if (map) {
        map = result.map.toString()
        code += '\n//# sourceMappingURL=' + fileName + '.map'
      }

      files.push({
        path: fileName,
        contents: code
      })

      if (map) {
        files.push({
          path: fileName + '.map',
          contents: map
        })
      }

      return Rx.Observable.fromArray(files)
    })
  }
}

module.exports = function (options) {
  options = options || {}
  if (typeof options.format === 'string') {
    options.format = escodegen[options.format]
  }
  options.sourceMapWithCode = true

  let generator = options.generator || defaultGenerator
  return typeof generator === 'function' ? generator(options) : generator
}
