/* global describe, it */

'use strict';

var assert = require('assert'),
	Rx = require('rx'),
	traverse = require('..');

it('has control properties', function () {
	assert.ok(traverse.Skip);
	assert.ok(traverse.Break);
});

it('traverse', function (done) {
	var input = [{
			type: 'File',
			program: {
				type: 'Program',
				body: [
					{
						type: 'ExpressionStatement',
						expression: {type: 'Literal', value: 'hello world'}
					},
					{
						type: 'ExpressionStatement',
						expression: {
							type: 'BinaryExpression',
							left: {type: 'Literal', value: 1},
							operator: '+',
							right: {
								type: 'BinaryExpression',
								left: {type: 'Literal', value: 2},
								operator: '*',
								right: {type: 'Literal', value: 3}
							}
						}
					}
				]
			},
			loc: {
				source: 'file.js'
			}
		}],
		expected = [{
			type: 'File',
			program: {
				type: 'Program',
				body: [
					{
						type: 'ExpressionStatement',
						expression: {type: 'Literal', value: 'hello world'}
					},
					{
						type: 'ExpressionStatement',
						expression: {type: 'Literal', value: 7}
					}
				]
			},
			loc: {
				source: 'file.js'
			}
		}];

	// simulating file sequence and applying transformation
	traverse({
		replace: true,
		leave: function (node) {
			if (node.type === 'BinaryExpression' && node.left.type === 'Literal' && node.right.type === 'Literal') {
				return {type: 'Literal', value: eval(JSON.stringify(node.left.value) + node.operator + JSON.stringify(node.right.value))};
			}
		}
	})(Rx.Observable.fromArray(input))
	// checking against array of expected results iteratively
	.zip(expected, assert.deepEqual)
	// subscribing to check results
	.subscribe(function () {}, done, done);
});

