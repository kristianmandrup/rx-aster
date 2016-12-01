# aster-watch
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> Continuous source files reader for aster.

## Usage

This module is part of [aster](https://npmjs.org/package/aster) and is available via `aster.watch`.

You use it in build scripts whenever you want to get list of files for executing build pipeline:

```javascript
var aster = require('aster');

aster.watch([
  '**/*.js',
  '!node_modules/**'
])
.throttle(500)
.map(plugin1(optionsForPlugin1))
.map(plugin2(optionsForPlugin2))
// ...
.subscribe(aster.runner);
```

`aster.watch` returns [`Rx.Observable`](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md) which, in order, emits inner observable collection of file ASTs every time something changes in watched folder.

## API

### watch(options)

#### options
Type: `Object`

Any options that can be passed into [aster.src](https://github.com/asterjs/aster-src) can be used in `aster.watch` as well.

#### options.init
Type: `Boolean`
Default: `true`

When set, emits initial collection of files before any change happens.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/aster-watch
[npm-image]: https://badge.fury.io/js/aster-watch.png

[travis-url]: http://travis-ci.org/asterjs/aster-watch
[travis-image]: https://secure.travis-ci.org/asterjs/aster-watch.png?branch=master
