/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
var path = require('path');
var loaderUtils = require('loader-utils');

module.exports = function () {};

module.exports.pitch = function (request) {
  if (this.cacheable) this.cacheable();

  return `
    var refs = 0;
    var content = require(${loaderUtils.stringifyRequest(this, `!!${request}`)});

    if(typeof content === 'string') content = [[module.id, content, '']];

    // Export CSS Modules
    if(content.locals) exports.locals = content.locals;

    exports.use = exports.ref = function() {
      return content;
    };

    exports.unuse = exports.unref = function() {};
  `;
};
