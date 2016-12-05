# rx-aster
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

<p align="center">
  <img src="https://avatars2.githubusercontent.com/u/6579498?s=300" />
</p>

<h1 align="center">aster - AST-based code builder</h1>

## What's that

aster is reactive builder specialized for code processing and transformations. It's built with debugging in mind and makes building JavaScript code more reliable and faster.

## Why one more

Source maps are a great invention that is meant to simplify life by allowing developers to debug the original code (the one that they actually write, whatever language it is) on production.

However, using them is pretty hard in any of existing build systems whenever you have at least one plugin in your build pipeline - and you most likely do - that doesn't support emitting them or even consuming from previous step; some plugins even treat code as simple strings discarding all it's inner logic and structure.

Your code isn't just a string. It has a soul and rich inner world and aster is built to treat it like that. As result, it provides complex yet easy and fast transformations that are transparent for browser debugger out of the box.

You can think of aster for JS as of [rework](https://github.com/reworkcss/rework) for CSS.

## But I like X builder! Should I throw it out?

Definitely no! aster doesn't try to fight your favorite build system. It has only one specific area that it's exceptionally good at - code processing. Everything else (CSS, images, publishing to CDN, etc.) is left for generic builders, and you can use them together.

Currently there are following bindings:

 * [grunt-aster](https://github.com/asterjs/grunt-aster) - binding for [Grunt](http://gruntjs.com/) JavaScript Task Runner.
 * [gulp-aster](https://github.com/asterjs/gulp-aster) - binding for [Gulp](http://gulpjs.com/) streaming build system.
 * ...more to come!

If you wish, you can define aster pipeline as custom task in any existing build system on your own since aster uses [RxJS](http://reactive-extensions.github.io/RxJS/) under the hood, which is interoperable with events, streams, promises, callbacks and any other asynchronous primitives and patterns out of the box.

## API

aster is completely modular and main package is just a centralized API wrapper for core parts published as separate modules (check out their documentations for details):

* `src` - Single-pass source files reader.
* `watch` - Continuous source files reader.
* `dest` - File writer.
* `runner` - Build pipeline runner with built-in logger.
* `equery` - Example query and modify, via [grasp-equery](http://www.graspjs.com/docs/equery/)
* `squery` - Standard (CSS like) query and modify, via [grasp-squery](http://www.graspjs.com/docs/squery/)
* `traverse` - AST traverser
* `parse` - Parser
* `parse-js` - JS Parser
* `parse-esnext` - ES.next Parser

## Usage

First, install `rx-aster` as a development dependency:

```shell
npm i --save rx-aster
```

or via `yarn`

```shell
yarn add rx-aster
```

- See [ESQuery API docs](https://github.com/mandricore/rx-aster/blob/master/docs/esquery%20api.md)
- See [grasp sample queries](https://github.com/gratex/grasp-samples)
- Read the blog articles
[refactoring-javascript-with-grasp](http://www.graspjs.com/blog/2014/01/07/refactoring javascript with grasp)
and [real life refactor examples](http://www.graspjs.com/blog/2014/02/09/refactoring-javascript-with-grasp-real-life-examples)
- Check the tests in `tests` and make them run and work!

### Creating a refactor pipeline

Create build script and use it.

```javascript
aster.watch([ // watch these files for changes
  'src/**/*.js',
  'src/**/*.coffee',
  'src/**/*.jsx'
])
.throttle(500) // every 500ms
.map(changed(function (src) {
  return src.map(equery({
    'if ($cond) return $expr1; else return $expr2;':
      'return <%= cond %> ? <%= expr1 %> : <%= expr2 %>'
  }));
}))
.map(concat('built.js'))
.map(umd({exports: 'superLib'}))
.map(aster.dest('dist', {sourceMap: true}))
.subscribe(aster.runner);
```

Using custom sources:

```js
const sources = ['var a = 1', 'var b = a + 2']

const srcObserver = Rx.Observable.of(sources);
const srcObserver2 = Rx.Observable.just(sources[0]);

aster.src({
  srcObserver
})
.map(equery({
  'if ($cond) return $expr1; else return $expr2;': 'return <%= cond %> ? <%= expr1 %> : <%= expr2 %>'
  // , ...
}))
.map(aster.dest((options) => {
  // return a function that when run returns an Observable
  return function(sinks) {
    // do something with the sinks...
    // ie. use incoming event streams from previous step (ie. .map(equery(...)), write to a destination
    return sinks
  }
}))
.subscribe(aster.runner({
  onNext: (item) => {
    console.log('>> %s'.yellow, item)
  }
}));

## Creating plugins

Check out aster's [Yeoman generator](https://github.com/asterjs/generator-aster).

It automizes the process of creating basic skeleton and Github repo for your plugin in few easy steps. When created, you just need to modify [`index.js`](https://github.com/asterjs/generator-aster/blob/master/app/templates/index.js) and [`test.js`](https://github.com/asterjs/generator-aster/blob/master/app/templates/test/test.js) files to reflect your intended plugin's functionality (detailed hints included right in code).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/aster
[npm-image]: https://badge.fury.io/js/aster.png

[travis-url]: http://travis-ci.org/asterjs/aster
[travis-image]: https://secure.travis-ci.org/asterjs/aster.png?branch=master
