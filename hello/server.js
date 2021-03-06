var express = require('express');

var app = express();

app.set('port', process.env.PORT || 8888);
app.use(express.static(__dirname + '/'));

console.log(__dirname + '/');
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
})
