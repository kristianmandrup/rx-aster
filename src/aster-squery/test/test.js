/* global describe, it */

'use strict'

const assert = require('chai').assert
const Rx = require('rx')
const squery = require('..')
const parse = require('esprima').parse
const generate = require('escodegen').generate

it('function handler', function (done) {
  const input = [{
    type: 'File',
    program: parse('function isEven(x) {\n    if ((x & 1) === 0)\n        return \'yes\'\n    else\n        return \'no\'\n}'),
    loc: {
      source: 'file.js'
    }
  }]
  const expected = ['function isEven(x) {\n    return (x & 1) === 0 ? \'yes\' : \'no\'\n}']

  // simulating file sequence and applying transformation
  squery({
    'if[then=return][else=return]': function (node) {
      return {
        type: 'ReturnStatement',
        argument: {
          type: 'ConditionalExpression',
          test: node.test,
          consequent: node.consequent.argument,
          alternate: node.alternate.argument
        }
      }
    }
  })(Rx.Observable.fromArray(input))
  .pluck('program')
  .map(generate)
  // .zip(expected, assert.equal)
  .do(function (file) {
    assert.equal(file, expected[0])
  })

  .subscribe(function () {}, done, done)
})

it('template handler', function (done) {
  const input = [{
    type: 'File',
    program: parse('function isEven(x) {\n    if ((x & 1) === 0)\n        return \'yes\'\n    else\n        return \'no\'\n}'),
    loc: {
      source: 'file.js'
    }
  }]
  const expected = ['function isEven(x) {\n    return (x & 1) === 0 ? \'yes\' : \'no\'\n}']

  // simulating file sequence and applying transformation
  squery({
    'if[then=return][else=return]': 'return <%= test %> ? <%= consequent.argument %> : <%= alternate.argument %>'
  })(Rx.Observable.fromArray(input))
  .pluck('program')
  .map(generate)
  // .zip(expected, assert.equal)
  .do(function (file) {
    assert.equal(file, expected[0])
    // assert.equal(file.program.type, 'Program')
  })

  .subscribe(function () {}, done, done)
})
