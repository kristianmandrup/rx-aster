# aster-generate
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> JavaScript generator for aster.

## Usage

This is mostly internal module that you don't want to use directly but rather as part of [aster-dest](https://npmjs.org/package/aster-dest).
However, you should use it directly when developing bindings for external build systems.

## API

### generate(options)

Supports any options from [escodegen documentation](https://github.com/Constellation/escodegen/wiki/API).

### option.generator

Allow passing a custom Obserable generator, either directly or as a factory function.

The `defaultGenerator` used if no `generator` option passed:

```js
function defaultGenerator(options) {
    return function(files) {
        return files.flatMap(function (file) {
            var result = escodegen.generate(file.program, options);
            // ...
            return Rx.Observable.fromArray(files);
        })
    }
}
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/aster-generate
[npm-image]: https://badge.fury.io/js/aster-generate.png

[travis-url]: http://travis-ci.org/asterjs/aster-generate
[travis-image]: https://secure.travis-ci.org/asterjs/aster-generate.png?branch=master
