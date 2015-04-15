var multiline = require('multiline')
var verify = require('adventure-verify')
var fs = require('fs')
var path = require('path')

exports.problem = multiline(function() { /* 
### Exercise 5

Now that we have our form adding data to our service, we want to redirect the user back to the main page and show the new item in a list.

--

### Step 1

We need to inject the $state service in our add controller, then use the $state.go method to redirect to the main state.

--

controllers.js

    angular.module('App')
      .controller('AddController', function($scope, bucketlist, $state) {
        $scope.add = function(thing) {
          bucketlist.add(thing)
          $state.go('main')
        }
      })

--

Now we need to create a main controller and attach it to our route

controllers.js

    angular.module('App')
      .controller('AddController', function($scope, bucketlist, $state) {
        $scope.add = function(thing) {
          bucketlist.add(thing)
          $state.go('main')
        }
      })
      .controller('MainController', function($scope, bucketlist, $state) {
        $scope.bucketlist = bucketlist.all()
      })

--

app.js

    angular.module('App', ['ui.router'])
      .config(function($stateProvider) {
        $stateProvider
          .state('main', {
            url: '/',
            templateUrl: '/templates/main.html',
            controller: 'MainController'
          })
          .state('add', {
            url: '/add',
            templateUrl: '/templates/add.html',
            controller: 'AddController'
          })
      })

--

And we have to create a new function on our service to provide all of the bucketlist items

services.js

    angular.module('App')
      .factory('bucketlist', function() {
        var list = [];
        return {
          add: function(thing) {
            list.push(thing)
          },
          all: function() {
            return list
          }
        }
      })*/})

exports.verify = verify(function(args, t) {
  t.end()
})