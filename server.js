//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/angular-issdemo'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/angular-issdemo/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);


/*const path = require('path');
const express = require('express');
const app = express();

// Serve static files
app.use(express.static(__dirname + '/dist/angular-issdemo/'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/src/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || 8080);*/


/*function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
      return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}*/
/*const express = require('express');
const app = express();
//app.use(requireHTTPS);
app.use(express.static('./dist/angular-issdemo>'));
app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/angular-issdemo/'});
});
app.listen(process.env.PORT || 5000);*/
