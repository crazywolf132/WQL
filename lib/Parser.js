"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Lexer = _interopRequireDefault(require("./Lexer.js"));

var _TokenType = require("./TokenType.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = console.log;

const util = require('util');

const inspect = data => util.inspect(data, false, null, true
/* enable colors */
);

class Parser extends _Lexer.default {
  match(type) {
    return this.lookahead.type === type;
  }

  eat(type) {
    if (this.match(type)) {
      return this.lex();
    }

    return null;
  }

  expect(type) {
    if (this.match(type)) {
      return this.lex();
    }

    throw this.createUnexpected(this.lookahead);
  }

  expectMany(...type) {
    let found;
    type.forEach(t => {
      if (this.match(t)) {
        found = this.lex();
      }
    });

    if (!found) {
      throw this.createUnexpected(this.lookahead);
    } else {
      return found.value;
    }
  }

  parseQuery() {
    return {
      type: 'Query',
      fields: this.parseFieldList()
    };
  }

  parseIdentifier() {
    return this.expect(_TokenType.TokenType.IDENTIFIER).value;
  }

  parseNumber() {
    return this.expect(_TokenType.TokenType.NUMBER).value;
  }

  parseDefault() {
    // Should also handle references
    return this.expect(this.lookahead.type).value;
  }

  parseList() {
    this.expect(_TokenType.TokenType.LSQUARE);
    let fields = this.parseFieldList();
    this.expect(_TokenType.TokenType.RSQUARE);
    return fields;
  }

  parseSize() {
    this.expect(_TokenType.TokenType.LT);
    let size = this.parseNumber();
    this.expect(_TokenType.TokenType.GT);
    return size;
  }

  parseType() {
    return this.expectMany(_TokenType.TokenType.TYPE_LIST, _TokenType.TokenType.TYPE_NUMBER, _TokenType.TokenType.TYPE_OBJ, _TokenType.TokenType.TYPE_STRING);
  }

  parseFieldList() {
    this.expect(_TokenType.TokenType.LBRACE);
    const fields = [];
    let first = true;

    while (!this.match(_TokenType.TokenType.RBRACE) && !this.end()) {
      if (first) {
        first = false;
      } else {
        this.expect(_TokenType.TokenType.COMMA);
      }

      if (this.match(_TokenType.TokenType.AMP)) {
        fields.push(this.parseReference());
      } else if (this.match(_TokenType.TokenType.AT)) {
        fields.push(this.parseVar());
      } else {
        fields.push(this.parseField());
      }
    }

    this.expect(_TokenType.TokenType.RBRACE);
    return fields;
  }

  parseField() {
    const name = this.parseIdentifier();
    const sizeLimit = this.match(_TokenType.TokenType.LT) ? this.parseSize() : null;
    const listFields = this.eat(_TokenType.TokenType.COLON) ? this.parseList() : null;
    const alias = this.eat(_TokenType.TokenType.AS) ? this.parseIdentifier() : null;
    const defaultValue = this.eat(_TokenType.TokenType.EQUALS) ? this.parseDefault() : null;
    const RequiredType = this.eat(_TokenType.TokenType.IS) ? this.parseType() : null;
    const fields = this.match(_TokenType.TokenType.LBRACE) ? this.parseFieldList() : [];

    if (listFields) {
      return {
        type: 'List',
        name,
        sizeLimit,
        listFields
      };
    }

    return {
      type: 'Field',
      name,
      alias,
      RequiredType,
      defaultValue,
      fields
    };
  }

  parseValue() {
    switch (this.lookahead.type) {
      case _TokenType.TokenType.AMP:
        return this.parseReference();

      case _TokenType.TokenType.AT:
        return this.parseVar();

      case _TokenType.TokenType.LT:
        return this.parseVariable();

      case _TokenType.TokenType.Number:
      case _TokenType.TokenType.String:
        return {
          type: 'Literal',
          value: this.lex().value
        };

      case _TokenType.TokenType.NULL:
      case _TokenType.TokenType.TRUE:
      case _TokenType.TokenType.FALSE:
        return {
          type: 'Literal',
          value: JSON.parse(this.lex().value)
        };
    }

    throw this.createUnexpected(this.lookahead);
  }

  parseReference() {
    this.expect(_TokenType.TokenType.AMP);

    if (this.match(_TokenType.TokenType.NUMBER) || this.match(_TokenType.TokenType.IDENTIFIER)) {
      return {
        type: 'Reference',
        name: this.lex().value
      };
    }

    throw this.createUnexpected(this.lookahead);
  }

  parseVar() {
    this.expect(_TokenType.TokenType.AT);
    const name = this.expect(_TokenType.TokenType.IDENTIFIER).value;
    const fields = this.parseFieldList();
    return {
      type: 'Var',
      name,
      fields,
      isVar: true
    };
  }

  parseVariable() {
    this.expect(_TokenType.TokenType.LT);
    const name = this.expect(_TokenType.TokenType.IDENTIFIER).value;
    this.expect(_TokenType.TokenType.GT);
    return {
      type: 'Variable',
      name
    };
  }

}

exports.default = Parser;