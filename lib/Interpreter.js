"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Interpreter {
  constructor(ast, data) {
    this.ast = ast;
    this.data = data;
    this.result = (!Array.isArray(this.data) ? this.compile(this.ast, this.data) : this.data.map(d => this.compile(this.ast, d))).filter(result => Object.keys(result).length >= 1);
  }

  meetsParams(data, params) {
    let requiredCount = params.length;
    let found = 0;
    params.forEach(p => {
      // If p.name is a list... we need to check each name against the values, and see if atleast one matches.
      if (Array.isArray(p.name)) {
        // Its 1 because it is an OR statement. So only 1 must be true.
        let newCount = 1;
        let newFound = 0;

        if (Array.isArray(p.value)) {
          // If we also have multiple values... check them both at the same time.
          p.name.forEach(n => {
            p.value.forEach(v => {
              if (this.compare2(data[n], p.condition, v)) newFound++;
            });
          });
        } else {
          p.name.forEach(n => {
            if (this.compare2(data[n], p.condition, p.value)) newFound++;
          });
        }

        if (newFound >= newCount) return found++;
      } else if (Array.isArray(p.value)) {
        // if the values is a list... we need to check to see if atleast 1 matches.
        let newCount = 1;
        let newFound = 0;
        p.value.forEach(v => {
          if (this.compare2(data[p.name], p.condition, v)) {
            newFound++;
          }
        });
        if (newFound >= newCount) found++;
      }

      if (this.compare2(data[p.name], p.condition, p.value)) found++;
    });
    return requiredCount === found;
  }

  compile(ast, data) {
    let obj = {};
    if (Object.keys(ast).length === 0) return data;
    Object.keys(ast).forEach(key => {
      if (!ast[key].isVar) {
        // We can actually add this to our object...
        if (this.hasKey(ast[key], 'isList')) {
          obj[ast[key].alias || key] = this.listType(data[key], ast[key]);
        } else if (this.hasKey(ast[key], 'fields')) {
          let children = this.handleChildren(data, ast[key]);
          if (children != undefined) obj[ast[key].alias || key] = children;
        } else if (this.hasKey(ast[key], 'RequiredType')) {
          obj[ast[key].alias || key] = this.requiredType(data[key], ast[key]);
        } else if (key === 'fields') {
          // We need to go into this object, and get its objects...
          obj = this.compile(ast[key], data);
        } else if (this.hasKey(ast[key], 'ifelse')) {
          // performing the ifstatement our self.
          obj[ast[key].alias || key] = this.compare2(data[key], ast[key].ifelse._comparitor, ast[key].ifelse._check) ? ast[key].ifelse._if instanceof Object ? this.compile(ast[key].ifelse._if, data) : data[ast[key].ifelse._if] : ast[key].ifelse._else instanceof Object ? this.compile(ast[key].ifelse._else, data) : data[ast[key].ifelse._else];
        } else {
          obj[ast[key].alias || key] = this.basicField(data[key], ast[key]);
        }
      }
    });
    return obj;
  }

  requiredType(data, field) {
    return typeof data === field.RequiredType.toLowerCase() ? data : null;
  }

  listType(data, field) {
    return Array.isArray(data) ? this.cleanList(data.map((d, index) => {
      if (index + 1 <= (field.sizeLimit || data.length)) return this.compile(field.fields, d);else return null;
    })) : this.compile(field.fields, data || {});
  }

  handleChildren(data, field) {
    if (this.hasKey(field, 'params') && this.meetsParams(data, field.params) || !this.hasKey(field, 'params')) return this.hasKey(field, 'toConvert') ? this.convertToType(data, field) : this.compile(field, data);
  }

  convertToType(data, field) {
    let children = Object.values(this.compile(field, data)).filter(i => i != undefined);
    return field.toConvert === 'LIST' ? children : children.join(' ');
  }

  basicField(data, field) {
    return data ? data : field.defaultValue ? field.defaultValue : undefined;
  }

  hasKey(obj, keyName) {
    return obj.hasOwnProperty(keyName);
  }

  cleanList(data) {
    return _lodash.default.compact(data);
  }

  compare2(obj1, comparitor, obj2) {
    switch (comparitor) {
      case '>':
        return obj1 >= obj2;

      case '<':
        return obj1 <= obj2;

      case '!':
        return obj1 != obj2;

      case '*':
        return String(obj1).includes(String(obj2));

      case '=':
      default:
        return obj1 === obj2;
    }
  }

}

exports.default = Interpreter;