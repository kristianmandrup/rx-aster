/* global describe, it */

'use strict';

var assert = require('chai').assert,
	Rx = require('rx'),
	watch = require('..'),
	fs = require('fs');

process.chdir(__dirname + '/fixtures');

it('init test', function (done) {
	watch('**/*.js', {init: true})
	.take(1)
	.concatAll()
	.do(function (file) {
		assert.equal(file.program.type, 'Program');
	})
	.pluck('loc').pluck('source')
	.toArray()
	.do(function (sources) {
		assert.deepEqual(sources.sort(), ['a.js', 'b.js']);
	})
	.subscribe(function () {}, done, done);
});

it('change test', function (done) {
	watch('**/*.js', {init: false})
	.take(1)
	.concatAll()
	.do(function (file) {
		assert.equal(file.program.type, 'Program');
	})
	.pluck('loc').pluck('source')
	.toArray()
	.do(function (sources) {
		assert.deepEqual(sources.sort(), ['a.js', 'b.js']);
	})
	.subscribe(function () {}, done, done);

	fs.writeFile('b.js', 'var b = 1;\r\n', function () {});
});
