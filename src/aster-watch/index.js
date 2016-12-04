'use strict'

const Rx = require('rx')
const Gaze = require('gaze').Gaze
const joinPath = require('path').join
const pathSep = require('path').sep
const asterSrc = require('../').src

module.exports = function (patterns, options) {
  options = options || {}

  const gaze = new Gaze(patterns, {cwd: options.cwd})
  const _getWatched = Rx.Observable.fromNodeCallback(gaze.relative, gaze)

  var getWatched = function () {
    return _getWatched().flatMap(function (res) {
      return Rx.Observable.fromArray(Object.keys(res)).flatMap(function (path) {
        return Rx.Observable.fromArray(res[path])
          .filter(function (fileName) {
            return fileName.slice(-1) !== pathSep
          })
          .map(function (fileName) {
            return joinPath(path, fileName)
          })
      })
    })
  }

  let smthChanged = Rx.Observable.fromEvent(gaze, 'all')

  if (options.init !== false) {
    smthChanged = Rx.Observable.return().concat(smthChanged)
  }

  return smthChanged.map(getWatched).flatMap(function (files) {
    return files.toArray().flatMap(function (files) {
      options.noglob = true
      return asterSrc(files, options)
    })
  })
}
