'use strict'

var Rx = require('rx')
require('colors')


var defaults = {
  onNext: function (file) {
    console.log('>> %s'.yellow, file.path)
  },
  onError: function (error) {
    console.error(error.stack.red)
  },
  onCompleted: function () {
    console.log('Done.'.green)
  }
}

function defaultSubscriber (options) {
  return function onFiles (files) {
    console.log('Processing files...')

    files.subscribe(Rx.Observer.create(
      options.onNext || defaults.onNext,
      options.onError || defaults.onError,
      options.onCompleted || defaults.onCompleted
    ))
  }
}

module.exports = function (options) {
  var subscriber = options.subscriber || defaultSubscriber
  subscriber = typeof subscriber === 'function' ? subscriber(options) : subscriber

  Rx.Observer.create(subscriber)
}
