"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 *  Provide static calls for all methods.
 *
 *  Instead this: let users = new User().with('country').get()
 *  We can do this: let users = User.with('conutry').get()
 *
 */
var StaticModel = /*#__PURE__*/function () {
  function StaticModel() {
    (0, _classCallCheck2["default"])(this, StaticModel);
  }

  (0, _createClass2["default"])(StaticModel, null, [{
    key: "instance",
    value: function instance() {
      return new this();
    }
  }, {
    key: "config",
    value: function config(_config) {
      var self = this.instance();
      self.config(_config);
      return self;
    }
  }, {
    key: "include",
    value: function include() {
      var self = this.instance();
      self.include.apply(self, arguments);
      return self;
    }
  }, {
    key: "with",
    value: function _with() {
      var self = this.instance();
      self["with"].apply(self, arguments);
      return self;
    }
  }, {
    key: "append",
    value: function append() {
      var self = this.instance();
      self.append.apply(self, arguments);
      return self;
    }
  }, {
    key: "select",
    value: function select() {
      var self = this.instance();
      self.select.apply(self, arguments);
      return self;
    }
  }, {
    key: "where",
    value: function where(field, value) {
      var self = this.instance();
      self.where(field, value);
      return self;
    }
  }, {
    key: "whereIn",
    value: function whereIn(field, array) {
      var self = this.instance();
      self.whereIn(field, array);
      return self;
    }
  }, {
    key: "orderBy",
    value: function orderBy() {
      var self = this.instance();
      self.orderBy.apply(self, arguments);
      return self;
    }
  }, {
    key: "page",
    value: function page(value) {
      var self = this.instance();
      self.page(value);
      return self;
    }
  }, {
    key: "limit",
    value: function limit(value) {
      var self = this.instance();
      self.limit(value);
      return self;
    }
  }, {
    key: "custom",
    value: function custom() {
      var self = this.instance();
      self.custom.apply(self, arguments);
      return self;
    }
  }, {
    key: "params",
    value: function params(payload) {
      var self = this.instance();
      self.params(payload);
      return self;
    }
  }, {
    key: "first",
    value: function first() {
      var self = this.instance();
      return self.first();
    }
  }, {
    key: "$first",
    value: function $first() {
      var self = this.instance();
      return self.$first();
    }
  }, {
    key: "find",
    value: function find(id) {
      var self = this.instance();
      return self.find(id);
    }
  }, {
    key: "$find",
    value: function $find(id) {
      var self = this.instance();
      return self.$find(id);
    }
  }, {
    key: "get",
    value: function get() {
      var self = this.instance();
      return self.get();
    }
  }, {
    key: "all",
    value: function all() {
      var self = this.instance();
      return self.all();
    }
  }, {
    key: "$get",
    value: function $get() {
      var self = this.instance();
      return self.$get();
    }
  }, {
    key: "$all",
    value: function $all() {
      var self = this.instance();
      return self.$all();
    }
  }]);
  return StaticModel;
}();

exports["default"] = StaticModel;