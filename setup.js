var multiline = require('multiline')
var verify = require('adventure-verify')
var fs = require('fs')
var path = require('path')

exports.problem = multiline(function() { /* 
### Setup

We are going to install nodejs if you do not already have nodejs download and install from [http://nodejs.org](http://nodejs.org) - then we will create a new directory and a simple `index.html` file.  This file will link to cdnjs for all of our dependencies.

### Setup

    # nodejs required
    npm i w3 -g
    mkdir bucket-list-app
    cd bucket-list-app
    touch index.html

edit index.html

    <!doctype html>
    <html>
      <head>
        <title>Foo</title>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css">
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css">
        <link rel="stylesheet" href="/custom.css">
      </head>
      <body>
        <h1>Hello World</h1>
        <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.13/angular-ui-router.js"></script>
      </body>
    </html>
*/})

var solution = exports.solution = multiline(function() {/*
<!doctype html>
<html>
  <head>
    <title>Foo</title>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css">
    <link rel="stylesheet" href="/custom.css">
  </head>
  <body>
    <h1>Hello World</h1>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.13/angular-ui-router.js"></script>
  </body>
</html>
*/})

exports.verify = verify(function(args, t) {
  var indexHtml = fs.readFileSync(path.resolve('index.html'), 'utf-8')
  t.equals(indexHtml, solution)
  t.end()
})