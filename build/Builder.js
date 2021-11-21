"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _dset = _interopRequireDefault(require("dset"));

var _Parser = _interopRequireDefault(require("./Parser"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Builder = /*#__PURE__*/function () {
  function Builder(model) {
    (0, _classCallCheck2["default"])(this, Builder);
    this.model = model;
    this.includes = [];
    this.appends = [];
    this.sorts = [];
    this.pageValue = null;
    this.limitValue = null;
    this.payload = null;
    this.fields = {};
    this.filters = {};
    this.parser = new _Parser["default"](this);
  } // query string parsed


  (0, _createClass2["default"])(Builder, [{
    key: "query",
    value: function query() {
      return this.parser.query();
    }
    /**
     * Helpers
     */

    /**
     * Nested filter via array-type keys.
     *
     * @example
     * const [_key, _value] = this._nestedFilter(keys, value)
     * this.filters[_key] = _value
     *
     * @param {string[]} keys - Array-type keys, like `['a', 'b', 'c']`.
     * @param {*} value - The value to be set.
     *
     * @return {[]} - An array containing the first key, which is the index to be used in `filters`
     * object, and a value, which is the nested filter.
     *
     */

  }, {
    key: "_nestedFilter",
    value: function _nestedFilter(keys, value) {
      // Get first key from `keys` array, then remove it from array
      var _key = keys.shift(); // Initialize an empty object


      var _value = {}; // Convert the keys into a deeply nested object, which the value of the deepest key is
      // the `value` property.
      // Then assign the object to `_value` property.

      (0, _dset["default"])(_value, keys, value);
      return [_key, _value];
    }
    /**
     * Query builder
     */

  }, {
    key: "include",
    value: function include() {
      for (var _len = arguments.length, relationships = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
        relationships[_key2] = arguments[_key2];
      }

      relationships = Array.isArray(relationships[0]) ? relationships[0] : relationships;
      this.includes = relationships;
      return this;
    }
  }, {
    key: "append",
    value: function append() {
      for (var _len2 = arguments.length, attributes = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
        attributes[_key3] = arguments[_key3];
      }

      attributes = Array.isArray(attributes[0]) ? attributes[0] : attributes;
      this.appends = attributes;
      return this;
    }
  }, {
    key: "select",
    value: function select() {
      var _this = this;

      for (var _len3 = arguments.length, fields = new Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
        fields[_key4] = arguments[_key4];
      }

      if (fields.length === 0) {
        throw new Error('You must specify the fields on select() method.');
      } // single entity .select(['age', 'firstname'])


      if (typeof fields[0] === 'string' || Array.isArray(fields[0])) {
        this.fields[this.model.resource()] = fields.join(',');
      } // related entities .select({ posts: ['title', 'content'], user: ['age', 'firstname']} )


      if ((0, _typeof2["default"])(fields[0]) === 'object') {
        Object.entries(fields[0]).forEach(function (_ref) {
          var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          _this.fields[key] = value.join(',');
        });
      }

      return this;
    }
  }, {
    key: "where",
    value: function where(key, value) {
      if (key === undefined || value === undefined) {
        throw new Error('The KEY and VALUE are required on where() method.');
      }

      if (Array.isArray(value) || value instanceof Object) {
        throw new Error('The VALUE must be primitive on where() method.');
      }

      if (Array.isArray(key)) {
        var _this$_nestedFilter = this._nestedFilter(key, value),
            _this$_nestedFilter2 = (0, _slicedToArray2["default"])(_this$_nestedFilter, 2),
            _key = _this$_nestedFilter2[0],
            _value = _this$_nestedFilter2[1];

        this.filters[_key] = _objectSpread({}, this.filters[_key], {}, _value);
      } else {
        this.filters[key] = value;
      }

      return this;
    }
  }, {
    key: "whereIn",
    value: function whereIn(key, array) {
      if (!Array.isArray(array)) {
        throw new Error('The second argument on whereIn() method must be an array.');
      }

      if (Array.isArray(key)) {
        var _this$_nestedFilter3 = this._nestedFilter(key, array.join(',')),
            _this$_nestedFilter4 = (0, _slicedToArray2["default"])(_this$_nestedFilter3, 2),
            _key = _this$_nestedFilter4[0],
            _value = _this$_nestedFilter4[1];

        this.filters[_key] = _objectSpread({}, this.filters[_key], {}, _value);
      } else {
        this.filters[key] = array.join(',');
      }

      return this;
    }
  }, {
    key: "orderBy",
    value: function orderBy() {
      for (var _len4 = arguments.length, fields = new Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
        fields[_key5] = arguments[_key5];
      }

      fields = Array.isArray(fields[0]) ? fields[0] : fields;
      this.sorts = fields;
      return this;
    }
  }, {
    key: "page",
    value: function page(value) {
      if (!Number.isInteger(value)) {
        throw new Error('The VALUE must be an integer on page() method.');
      }

      this.pageValue = value;
      return this;
    }
  }, {
    key: "limit",
    value: function limit(value) {
      if (!Number.isInteger(value)) {
        throw new Error('The VALUE must be an integer on limit() method.');
      }

      this.limitValue = value;
      return this;
    }
  }, {
    key: "params",
    value: function params(payload) {
      if (payload === undefined || (0, _typeof2["default"])(payload) !== 'object') {
        throw new Error('You must pass a payload/object as param.');
      }

      this.payload = payload;
      return this;
    }
  }]);
  return Builder;
}();

exports["default"] = Builder;