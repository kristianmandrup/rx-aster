'use strict'

const Rx = require('rx')
const glob = require('./glob')
const readFile = Rx.Observable.fromNodeCallback(require('fs').readFile)
const resolvePath = require('path').resolve
const asterParse = require('../').parse

function filesSrc (patterns, options) {
  return glob(patterns, options).flatMap(function (path) {
    var fullPath = resolvePath(options.cwd || '', path)

    return readFile(fullPath, 'utf-8').map(function (contents) {
      return {
        path: path,
        contents: contents
      }
    })
  })
}

// allow passing a sources function which can be used to customize
// creation of a sources observer
module.exports = function (patterns, options) {
  if (patterns === Object(patterns)) {
    options = patterns
  }
  options = options || {}

  var srcObserver = options.srcObserver || filesSrc

  var sources = typeof srcObserver === 'function' ? srcObserver(patterns || options, options) : srcObserver

  var parse

  switch (typeof options.parse) {
    case 'function':
      parse = options.parse
      break

    case 'boolean':
    case 'undefined':
      if (options.parse !== false) {
        parse = asterParse()
      }
      break

    case 'object':
      parse = asterParse(options.parse)
      break

    default:
      throw new TypeError('Unknown options.parse format.')
  }

  return Rx.Observable.return(parse ? parse(sources) : sources)
}

module.exports.registerParser = asterParse.registerParser
