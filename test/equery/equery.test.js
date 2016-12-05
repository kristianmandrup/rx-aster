import test from 'ava'

const Rx = require('rx')
const equery = require('../../').equery
const parse = require('esprima').parse
const generate = require('escodegen').generate

// test('foo', async t => {
//   const input = [{
//     type: 'File',
//     program: parse('function isEven(x) {\n    if ((x & 1) === 0)\n        return \'yes\';\n    else\n        return \'no\';\n}'),
//     loc: {
//       source: 'file.js'
//     }
//   }]

//   const expected = ['function isEven(x) {\n    return (x & 1) === 0 ? \'yes\' : \'no\';\n}'];

//   async function done (res) {
//     return await res
//   }

//   // simulating file sequence and applying transformation
//   equery({
//     'if ($cond) return $expr1; else return $expr2;': 'return <%= cond %> ? <%= expr1 %> : <%= expr2 %>;'
//   })(Rx.Observable.fromArray(input))
//   .pluck('program')
//   .map(generate)
//   // .zip(expected, assert.equal)
//   .do(function (file) {
//     t.deepEqual(file, expected[0])
//     // assert.equal(file.program.type, 'Program');
//   })
//   .subscribe({
//     onNext: function () {},
//     ondone: done,
//     onComplete: done
//   })
// })
