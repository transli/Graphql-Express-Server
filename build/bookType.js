'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookInputType = exports.bookType = undefined;

var _graphql = require('graphql');

var _db = require('./db');

var _authorType = require('./authorType');

var _authorType2 = _interopRequireDefault(_authorType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bookType = exports.bookType = new _graphql.GraphQLObjectType({
  name: 'Book',
  description: 'Words on a page, tells a story.',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLString,
        resolve: function resolve(book) {
          return 'book-' + book.id;
        }
      },
      title: { type: _graphql.GraphQLString },
      image: { type: _graphql.GraphQLString },
      authorId: { type: _graphql.GraphQLString },
      description: { type: _graphql.GraphQLString },
      author: {
        type: _authorType2.default,
        resolve: function resolve(book) {
          return _db.authors[book.authorId];
        }
      }
    };
  }
});

var bookInputType = exports.bookInputType = new _graphql.GraphQLInputObjectType({
  name: 'BookInput',
  fields: function fields() {
    return {
      id: { type: _graphql.GraphQLString },
      title: { type: _graphql.GraphQLString },
      image: { type: _graphql.GraphQLString },
      description: { type: _graphql.GraphQLString },
      authorId: { type: _graphql.GraphQLString }
    };
  }
});

exports.default = bookType;