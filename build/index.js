'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _basicAuth = require('basic-auth');

var _basicAuth2 = _interopRequireDefault(_basicAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use((0, _cors2.default)());

app.use('/', function (req, res) {
  var user = (0, _basicAuth2.default)(req);
  (0, _expressGraphql2.default)({
    schema: _schema2.default,
    pretty: true,
    graphiql: true,
    rootValue: { user: user }
  })(req, res);
});

var port = process.env.NODE_ENV ? 80 : 5000;

app.listen(port, function () {
  console.log('app started on port ' + port);
});

// once app is started, execute queries like so:
// curl localhost:5000 -d "query={authors{id,name, books{id}}}"