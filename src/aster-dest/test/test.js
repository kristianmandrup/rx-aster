/* global it, before */

'use strict'

const assert = require('chai').assert
const Rx = require('rx')
const parse = require('esprima').parse
const dest = require('..')
const rimraf = require('rimraf')

before(function (done) {
  rimraf('.tmp', done)
})

it('test', function (done) {
  const input = [{
    type: 'File',
    program: parse('/* hello, world! */a=1', {loc: true, source: 'file.js', attachComment: true}),
    loc: {
      source: 'file.js'
    }
  }]
  const expected = [
    {
      path: 'file.js',
      contents: '/* hello, world! */\na = 1\n//# sourceMappingURL=file.js.map'
    },
    {
      path: 'file.js.map',
      contents: '{"version":3,"sources":["file.js"],"names":["a"],"mappings":"AAAmBAAAAA,CAAA,GAAE,CAAF"}'
    }
  ]
  let index = 0

  // simulating file sequence and applying transformation
  dest('.tmp', {comment: true, sourceMap: true})(Rx.Observable.fromArray(input))
  // checking against array of expected results iteratively
  // .zip(expected, assert.deepEqual)
  .do(function (file) {
    assert.deepEqual(file, expected[index++])
  })

  // subscribing to check results
  .subscribe(function () {}, done, done)
})

