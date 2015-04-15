var multiline = require('multiline')
var verify = require('adventure-verify')
var fs = require('fs')
var path = require('path')

exports.problem = multiline(function() { /* 
### Exercise 1

In this exercise we are going to create an angular app and setup two databinding to confirm we have everything setup correctly.  

--

#### Step 1

On the body element of your index.html file add the `ng-app` attribute.

--

#### Step 2

Inside the body element remove `<h1>Hello World</h1>` and add the following:

    <div ng-init="title = 'My Bucket List'"></div>
    <h1>{{title}}</h1>

--

#### Verify Exercise 1

    ng-adventure verify

--

#### Confirm in browser

    w3

Point Browser to http://localhost:3000
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
  <body ng-app>
    <div ng-init="title = 'My Bucket List'"></div>
    <h1>{{title}}</h1>
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