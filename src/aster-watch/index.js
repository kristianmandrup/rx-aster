'use strict';

var Rx = require('rx');
var Gaze = require('gaze').Gaze;
var joinPath = require('path').join;
var pathSep = require('path').sep;
var asterSrc = require('aster-src');

module.exports = function (patterns, options) {
	options = options || {};

	var gaze = new Gaze(patterns, {cwd: options.cwd});
	var _getWatched = Rx.Observable.fromNodeCallback(gaze.relative, gaze);

	var getWatched = function () {
		return _getWatched().flatMap(function (res) {
			return Rx.Observable.fromArray(Object.keys(res)).flatMap(function (path) {
				return Rx.Observable.fromArray(res[path])
					.filter(function (fileName) {
						return fileName.slice(-1) !== pathSep;
					})
					.map(function (fileName) {
						return joinPath(path, fileName);
					});
			});
		});
	};

	var smthChanged = Rx.Observable.fromEvent(gaze, 'all');

	if (options.init !== false) {
		smthChanged = Rx.Observable.return().concat(smthChanged);
	}

	return smthChanged.map(getWatched).flatMap(function (files) {
		return files.toArray().flatMap(function (files) {
			options.noglob = true;
			return asterSrc(files, options);
		});
	});
};
