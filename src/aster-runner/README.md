# aster-runner
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> Task observer for aster.

## Usage

This module is part of [aster](https://npmjs.org/package/aster) and is available via `aster.runner`.

You use it in build scripts whenever you want build pipeline (which is lazy by default) to be executed:

```javascript
var aster = require('aster');

aster.src('src/**/*.js')
.map(plugin1(optionsForPlugin1))
.map(plugin2(optionsForPlugin2))
// ...
.subscribe(aster.runner({
  onNext: (item) => {
    console.log('>> %s'.yellow, item)
  }
}));
```

When you create an `Observable`, you always pass 3 functions in this order:
- `successHandler`
- `errorHandler`
- `onCompleteHandler`

The `success` or `error` handler is called for each processed event/item of the Observable stream, the `onComplete` handler when the stream is done (such as no more files to be processed).

The default event handlers are:

```js
function onFile(file) {
  console.log('>> %s'.yellow, file.path)
}

function onError(error) {
  console.error(error.stack.red)
}

function onCompleted() {
  console.log('Done.'.green)
}
```

Where `onFile` is used for `onSuccess` and expects a `file` object with a `path`.

## API

### runner
Type: [`Rx.Observer`](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observer.md)

#### options.onSuccess

Success event handler for individual item/event processed.

#### options.onError

Error event handler for individual item/event processed.

#### options.onCompleted

Completed handler for when entire stream of events/items of Observable has been processed.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/aster-runner
[npm-image]: https://badge.fury.io/js/aster-runner.png

[travis-url]: http://travis-ci.org/asterjs/aster-runner
[travis-image]: https://secure.travis-ci.org/asterjs/aster-runner.png?branch=master
