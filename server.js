const express = require('express');
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html', function (err) {
    if (err) {
      next(err);
    }
  });
});

app.listen(app.get('port'), function () {
  console.log('app listening on port ' + app.get('port'));
});