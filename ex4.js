var multiline = require('multiline')
var verify = require('adventure-verify')
var fs = require('fs')
var path = require('path')

exports.problem = multiline(function() { /* 
### Exercise 4

In this exercise we are going to setup a simple service to store our bucket list items:

--

#### Step 1

Create a file called `services.js`

** Hint make sure you are in your project root directory

--

#### Services JS

    angular.module('App')
      .factory('bucketlist', function() {
        var list = []
        var counter = 1
        return {
          add: function(thing) {
            thing.id = counter
            counter += 1
            list.push(thing)
          }
        }
      })

--

#### Step 3

Inject the bucketlist service into your add controller, ok so we don't have a add controller, we need to create one:

Create a file called controllers.js

    angular.module('App')
      .controller('AddController', function($scope, bucketlist) {
        $scope.add = function(thing) {
          bucketlist.add(thing)
          alert('added')
        }
      })

--

#### Step 4

Now we need to attach the controller to our route in app.js

    angular.module('App', ['ui.router'])
      .config(function($stateProvider) {
        $stateProvider
          .state('main', {
            url: '/',
            templateUrl: '/templates/main.html'
          })
          .state('add', {
            url: '/add',
            templateUrl: '/templates/add.html',
            controller: 'AddController'
          })
      })

--

#### Step 5

Finally we need to include the new js files in our index.html

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
        <script src="app.js"></script>
        <script src="services.js"></script>
        <script src="controllers.js"></script>
      </body>
    </html>
*/})

var solution1 = multiline(function() {/*
angular.module('App')
  .factory('bucketlist', function() {
    var list = []
    var counter = 1
    return {
      add: function(thing) {
        thing.id = counter
        counter += 1
        list.push(thing)
      }
    }
  })
*/})

var solution2 = multiline(function() {/*
angular.module('App', ['ui.router'])
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '/templates/main.html'
      })
      .state('add', {
        url: '/add',
        templateUrl: '/templates/add.html',
        controller: 'AddController'
      })
  })
*/})

var solution3 = multiline(function() {/*
angular.module('App')
  .controller('AddController', function($scope, bucketlist) {
    $scope.add = function(thing) {
      bucketlist.add(thing)
    }
  })
*/})

var solution4 = multiline(function() {/*
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
    <script src="app.js"></script>
    <script src="services.js"></script>
    <script src="controllers.js"></script>
  </body>
</html>
*/})

exports.verify = verify(function(args, t) {
  var svc = fs.readFileSync(path.resolve('services.js'), 'utf-8')
  var appJS = fs.readFileSync(path.resolve('app.js'), 'utf-8')
  var ctrl = fs.readFileSync(path.resolve('controllers.js'), 'utf-8')
  var indexHtml = fs.readFileSync(path.resolve('index.html'), 'utf-8')
  t.equals(svc, solution1)
  t.equals(appJS, solution2)
  t.equals(ctrl, solution3)
  t.equals(indexHtml, solution4)
  t.end()
})