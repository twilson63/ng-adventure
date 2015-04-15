var multiline = require('multiline')
var verify = require('adventure-verify')
var fs = require('fs')
var path = require('path')

exports.problem = multiline(function() { /* 
### Exercise 2

Now that we have a working angularjs application, lets go ahead and build out the routing and templates.

--

First we will modify the index.html file to use the `<ui-view></ui-view>` element.

Modify:

    <body ng-app="App">

Remove:

    <div ng-init="title = 'My Bucket List'"></div>
    <h1>{{title}}</h1>

Add:

     <ui-view></ui-view>

--

Next we need to create an `app.js` file to contain our routing information.

app.js

    angular.module('App', ['ui.router'])
      .config(function($stateProvider) {
        $stateProvider
          .state('main', {
            url: '/',
            template: '/templates/main.html'
          })
--

Now we need to create a templates directory and main.html file

    mkdir templates
    touch main.html

--

Edit the main.html and add this:

    <h1>My Bucket List</h1>

*/})

var solution1 = multiline(function() {/*
<!doctype html>
<html>
  <head>
    <title>Foo</title>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css">
    <link rel="stylesheet" href="/custom.css">
  </head>
  <body ng-app="App">
    <ui-view></ui-view>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.13/angular-ui-router.js"></script>
  </body>
</html>
*/})

var solution2 = multiline(function() {/*
angular.module('App', ['ui.router'])
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '/templates/main.html'
      })
  })
*/})

var solution3 = multiline(function() {/*
<h1>My Bucket List</h1>
*/})

exports.verify = verify(function(args, t) {
  var indexHtml = fs.readFileSync(path.resolve('index.html'), 'utf-8')
  var appJS = fs.readFileSync(path.resolve('app.js'), 'utf-8')
  var mainHtml = fs.readFileSync(path.resolve('templates/main.html'), 'utf-8')
  t.equals(indexHtml, solution1)
  t.equals(appJS, solution2)
  t.equals(mainHtml, solution3)
  t.end()
})