'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _db = require('./db');

var _bookType = require('./bookType');

var _bookType2 = _interopRequireDefault(_bookType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authorType = new _graphql.GraphQLObjectType({
  name: 'Author',
  description: 'The creator of books',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLString,
        resolve: function resolve(author) {
          return 'author-' + author.id;
        }
      },
      name: { type: _graphql.GraphQLString },
      image: { type: _graphql.GraphQLString },
      books: {
        type: new _graphql.GraphQLList(_bookType2.default),
        resolve: function resolve(author) {
          var authorsBooks = _db.books.filter(function (book) {
            return book.authorId === author.id;
          });
          return authorsBooks;
        }
      }
    };
  }
});

exports.default = authorType;