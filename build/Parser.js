"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _qs = _interopRequireDefault(require("qs"));

/**
 * Parse attributes from Builder into query string
 */
var Parser = /*#__PURE__*/function () {
  function Parser(builder) {
    (0, _classCallCheck2["default"])(this, Parser);
    this.builder = builder;
    this.uri = '';
  } // final query string


  (0, _createClass2["default"])(Parser, [{
    key: "query",
    value: function query() {
      this.reset();
      this.includes();
      this.appends();
      this.fields();
      this.filters();
      this.sorts();
      this.page();
      this.limit();
      this.payload();
      return this.uri;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.uri = '';
    }
    /**
     * Helpers
     */

  }, {
    key: "hasIncludes",
    value: function hasIncludes() {
      return this.builder.includes.length > 0;
    }
  }, {
    key: "hasAppends",
    value: function hasAppends() {
      return this.builder.appends.length > 0;
    }
  }, {
    key: "hasFields",
    value: function hasFields() {
      return Object.keys(this.builder.fields).length > 0;
    }
  }, {
    key: "hasFilters",
    value: function hasFilters() {
      return Object.keys(this.builder.filters).length > 0;
    }
  }, {
    key: "hasSorts",
    value: function hasSorts() {
      return this.builder.sorts.length > 0;
    }
  }, {
    key: "hasPage",
    value: function hasPage() {
      return this.builder.pageValue !== null;
    }
  }, {
    key: "hasLimit",
    value: function hasLimit() {
      return this.builder.limitValue !== null;
    }
  }, {
    key: "hasPayload",
    value: function hasPayload() {
      return this.builder.payload !== null;
    }
  }, {
    key: "prepend",
    value: function prepend() {
      return this.uri === '' ? '?' : '&';
    }
  }, {
    key: "parameterNames",
    value: function parameterNames() {
      return this.builder.model.parameterNames();
    }
    /**
     * Parsers
     */

  }, {
    key: "includes",
    value: function includes() {
      if (!this.hasIncludes()) {
        return;
      }

      this.uri += this.prepend() + this.parameterNames().include + '=' + this.builder.includes;
    }
  }, {
    key: "appends",
    value: function appends() {
      if (!this.hasAppends()) {
        return;
      }

      this.uri += this.prepend() + this.parameterNames().append + '=' + this.builder.appends;
    }
  }, {
    key: "fields",
    value: function fields() {
      if (!this.hasFields()) {
        return;
      }

      var fields = (0, _defineProperty2["default"])({}, this.parameterNames().fields, this.builder.fields);
      this.uri += this.prepend() + _qs["default"].stringify(fields, {
        encode: false
      });
    }
  }, {
    key: "filters",
    value: function filters() {
      if (!this.hasFilters()) {
        return;
      }

      var filters = (0, _defineProperty2["default"])({}, this.parameterNames().filter, this.builder.filters);
      this.uri += this.prepend() + _qs["default"].stringify(filters, {
        encode: false
      });
    }
  }, {
    key: "sorts",
    value: function sorts() {
      if (!this.hasSorts()) {
        return;
      }

      this.uri += this.prepend() + this.parameterNames().sort + '=' + this.builder.sorts;
    }
  }, {
    key: "page",
    value: function page() {
      if (!this.hasPage()) {
        return;
      }

      this.uri += this.prepend() + this.parameterNames().page + '=' + this.builder.pageValue;
    }
  }, {
    key: "limit",
    value: function limit() {
      if (!this.hasLimit()) {
        return;
      }

      this.uri += this.prepend() + this.parameterNames().limit + '=' + this.builder.limitValue;
    }
  }, {
    key: "payload",
    value: function payload() {
      if (!this.hasPayload()) {
        return;
      }

      this.uri += this.prepend() + _qs["default"].stringify(this.builder.payload, {
        encode: false
      });
    }
  }]);
  return Parser;
}();

exports["default"] = Parser;