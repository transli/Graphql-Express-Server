'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _graphql = require('graphql');

var _db = require('./db');

var _authorType = require('./authorType');

var _authorType2 = _interopRequireDefault(_authorType);

var _bookType = require('./bookType');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootFields = {
  authors: {
    type: new _graphql.GraphQLList(_authorType2.default),
    resolve: function resolve(_) {
      return _db.authors;
    }
  },
  books: {
    type: new _graphql.GraphQLList(_bookType.bookType),
    resolve: function resolve(_) {
      // Resolve functions can return promises
      return _promise2.default.resolve(_db.books);
    }
  },
  bookByID: {
    type: _bookType.bookType,
    args: {
      id: {
        type: _graphql.GraphQLString
      }
    },
    resolve: function resolve(object, _ref, context, info) {
      var id = _ref.id;

      return _db.books.find(function (book) {
        return 'book-' + book.id == id;
      });
    }
  },
  bookSearch: {
    type: new _graphql.GraphQLList(_bookType.bookType),
    args: {
      keyword: {
        type: _graphql.GraphQLString
      }
    },
    resolve: function resolve(object, _ref2, context, info) {
      var keyword = _ref2.keyword;

      return _db.books.filter(function (book) {
        return book.title.includes(keyword);
      });
    }
  },
  secret: {
    type: _graphql.GraphQLString,
    resolve: function resolve(object, args, context, _ref3) {
      var rootValue = _ref3.rootValue;

      var user = rootValue.user;
      if (!user) {
        return 'only authorized users can know the secret';
      }
      if (user.name === 'admin' && user.pass === '123') {
        return 'howdy admin';
      }
      return 'who are you?';
    }
  }
};

// Single "viewer" object for Relay root query compatibility
var Viewer = new _graphql.GraphQLObjectType({
  name: 'Viewer',
  fields: rootFields
});

var schema = new _graphql.GraphQLSchema({
  query: new _graphql.GraphQLObjectType({
    name: 'QueryRoot',
    fields: (0, _extends3.default)({
      viewer: {
        type: Viewer,
        resolve: function resolve() {
          return {};
        }
      }
    }, rootFields)
  }),
  mutation: new _graphql.GraphQLObjectType({
    name: 'MutationRoot',
    fields: {
      addBook: {
        type: _bookType.bookType,
        args: {
          book: {
            type: _bookType.bookInputType
          }
        },
        resolve: function resolve(object, _ref4) {
          var book = _ref4.book;

          _db.books.push(book);
          return book;
        }
      }
    }
  })
});

exports.default = schema;