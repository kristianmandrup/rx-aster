# aster-traverse
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> Traverse with aster.

## Usage

First, install `aster-traverse` as a development dependency:

```shell
npm install --save-dev aster-traverse
```

Then, add it to your build script:

```javascript
var aster = require('aster');
var traverse = require('aster-traverse');

aster.src('src/**/*.js')
.map(traverse({
  replace: true,
  leave: function (node) {
    // Optimizing obvious calculations, concatenations, etc.
    if (node.type === 'BinaryExpression' && node.left.type === 'Literal' && node.right.type === 'Literal') {
      return {type: 'Literal', value: eval(JSON.stringify(node.left.value) + node.operator + JSON.stringify(node.right.value))};
    }
  }
}))
.map(aster.dest('dist'))
.subscribe(aster.runner);
```

## API

### traverse(options)

#### options.enter, options.leave
Type: `Function`

Handler functions to be executed on enter/leave of each node.

#### options.replace
Type: `Boolean`

If set, result of `enter`/`leave` would be used as replacement for node.

### Special values

#### traverse.Skip

If returned from handler, this node would be skipped from processing.

#### traverse.Break

If returned from handler, breaks traversal completely.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/aster-traverse
[npm-image]: https://badge.fury.io/js/aster-traverse.png

[travis-url]: http://travis-ci.org/asterjs/aster-traverse
[travis-image]: https://secure.travis-ci.org/asterjs/aster-traverse.png?branch=master
