'use strict';

var jsx = require('./JSXTransformer');

module.exports = function (resolve, reject, data) {
  try {
    var res = jsx.transform(data.source).code;
    resolve({
      errors: null,
      result: res
    });
  } catch (e) {
    // index starts at 1
    var line = parseInt(e.lineNumber, 10) || 0;
    var ch = parseInt(e.column, 10) || 0;
    if (line > 0) {
      line = line - 1;
    }
    if (ch > 0) {
      ch = ch - 1;
    }
    var errors = {
      line: line,
      ch: ch,
      msg: e.description
    };
    resolve({
      errors: [errors],
      result: null
    });
  }
};