title: BucketList App
author:
  name: Tom Wilson
  twitter: twilson63
  url: http://jackhq.com
output: index.html
controls: true

--

# AngularJS Workshop
## POSSCON 2015

--

# Bucket List App

--

### Setup

We are going to install nodejs if you do not already have nodejs download and install from [http://nodejs.org](http://nodejs.org) - then we will create a new directory and a simple `index.html` file.  This file will link to cdnjs for all of our dependencies.

--

### Setup

    # nodejs required
    npm i w3 -g
    mkdir bucket-list-app
    cd bucket-list-app
    touch index.html

--

edit index.html

    <!doctype html>
    <html>
      <head>
        <title>Foo</title>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css">
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css">
      </head>
      <body>
        <h1>Hello World</h1>
        <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.13/angular-ui-router.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/pouchdb/3.4.0/pouchdb.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore.js"></script>
      </body>
    </html>

--

### Validate Setup

So lets validate our setup, in order to do this, we need to install tap:

    npm i ng-adventure -g
    ng-adventure 
    ng-adventure verify

--

### Run 

    w3 

open browser http://localhost:3000

--

### Exercise 1 - Databinding

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

#### Confirm in browser

    w3

Point Browser to http://localhost:3000

--

### Exercise 2 - Routing

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

Also add the app.js file at the end of the body

    <script src="app.js"></script>

--

Next we need to create an `app.js` file to contain our routing information.

app.js

    angular.module('App', ['ui.router'])
      .config(function($stateProvider) {
        $stateProvider
          .state('main', {
            url: '/',
            templateUrl: '/templates/main.html'
          })
--

Now we need to create a templates directory and main.html file

    mkdir templates
    touch main.html

--

Edit the main.html and add this:

    <h1>My Bucket List</h1>

--

### Exercise 3 - Forms

In this exercise we are going to creat a form for our bucket list.  We will
link the form to our main page by adding an `Add` button.

--

#### Create the form template:

    cd templates
    touch add.html

--

### Create an html form with the following elements:

* Title - input
* Description - textarea
* Save Button

--

### Here is how your form could look

    <div class="container">
      <h2>Add</h2>
      <form ng-submit="add(thing)">
        <fieldset>
          <label>Title</label>
          <input class="u-full-width" type="text" ng-model="thing.title">
        </fieldset>
        <fieldset>
          <label>Description</label>
          <textarea class="u-full-width" ng-model="thing.description"></textarea>
        </fieldset>
        <button class="button-primary u-pull-right">Save</button>
        <a class="button u-pull-right" ui-sref="index">Cancel</a>
      </form>
    </div>

--

### Next we have to add our route to our app.js file

    angular.module('App', ['ui.router'])
      .config(function($stateProvider) {
        $stateProvider
          .state('main', {
            url: '/',
            templateUrl: '/templates/main.html'
          })
          .state('add', {
            url: '/add',
            templateUrl: '/templates/add.html'
          })
      })

--

### Lastly, we want to create a link on our main.html template to our
add.html template

    <h1>My Bucket List</h1>
    <a class="button button-primary" ui-sref="add">Add</a>

--

### If we did everything right, we should be able to click the add button and
go to our add form

--

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
        var db = PouchDB('bucketlist')
        return {
          put: function(thing) {
            return db.put(thing)
          },
          get: function(id) {
            return db.get(id)
          },
          all: function() {
            return db.allDocs({ include_docs: true})
              .then(function(res) {
                return _(res.rows).pluck('doc')
              })
          }
        }
      })

--

#### Step 3

Inject the bucketlist service into your add controller, ok so we don't have a add controller, we need to create one:

Create a file called controllers.js

    angular.module('App')
      .controller('AddController', function($scope, bucketlist, $state) {
        $scope.add = function(thing) {
          thing._id = (new Date()).toISOString()
          bucketlist.put(thing)
            .then(function(res) {
              $state.go('main')
            })
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

--

verify via server

    w3

open http://localhost:3000


--

### Exercise 5

Now that we have our form adding data to our service, we want to redirect the user back to the main page and show the new item in a list.

--

index.html

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
        <script src="//cdnjs.cloudflare.com/ajax/libs/pouchdb/3.4.0/pouchdb.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore.js"></script>
        <script src="app.js"></script>
        <script src="services.js"></script>
        <script src="controllers.js"></script>
      </body>
    </html>


--

### Step 1

We need to inject the $state service in our add controller, then use the $state.go method to redirect to the main state.

--

controllers.js

    angular.module('App')
      .controller('AddController', function($scope, bucketlist, $state) {
        $scope.add = function(thing) {
          thing._id = (new Date()).toISOString()
          bucketlist.put(thing)
            .then(function(res) {
              $state.go('main')
            })
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
      .controller('ListController', function($scope, bucketlist) {
        bucketlist.all().then(function(things){
          $scope.$apply(function() {
            $scope.bucketlist = things  
          })
        })
      })

--

app.js

    angular.module('App', ['ui.router'])
      .config(function($stateProvider) {
        $stateProvider
          .state('main', {
            url: '/',
            templateUrl: '/templates/main.html',
            controller: 'ListController'
          })
          .state('add', {
            url: '/add',
            templateUrl: '/templates/add.html',
            controller: 'AddController'
          })
      })

--

### Exercise 6

Now that we have our list, lets render it to our main template using ng-repeat

--

main.html

    <div class="container">
      <h1>My Bucket List</h1>
      <a class="button button-primary" ui-sref="add">Add</a>
      <ul>
        <li ng-repeat="thing in bucketlist">
          {{thing.title}}
        </li>
      </ul>
    </div>

--

Let restart run the server and see 

--

### Exercise 7

List create a show page to display our bucket list item

* create a new route called show
* create a new templates called show.html
* create a new controller called ShowController

--

#### app.js

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
          .state('show', {
            url: '/show/:id',
            templateUrl: '/templates/show.html',
            controller: 'ShowController'
          })
      })

--

#### show.html

    <div class="container">
      <h2>{{thing.title}}</h2>
      <p>{{thing.description}}</p>
      <a class="button" ui-sref="edit({ id: thing._id})">Edit</a>
    </div>

--

#### controllers.js

    angular.module('App')
      .controller('AddController', function($scope, bucketlist, $state) {
        $scope.add = function(thing) {
          thing._id = (new Date()).toISOString()
          bucketlist.put(thing)
            .then(function(res) {
              $state.go('main')
            })
        }
      })
      .controller('ListController', function($scope, bucketlist) {
        bucketlist.all().then(function(things){
          $scope.$apply(function() {
            $scope.bucketlist = things  
          })
        })
      })
      .controller('ShowController', function($scope, bucketlist, $stateParams) {
        bucketlist.get($stateParams.id).then(function(thing) {
          $scope.$apply(function() {
            $scope.thing = thing
          })
        })
      })

--

#### main.html

    <div class="container">
      <h1>My Bucket List</h1>
      <a class="button button-primary" ui-sref="add">Add</a>
      <ul>
        <li ng-repeat="thing in bucketlist">
          <a ui-sref="show({ id: thing._id })">
            {{thing.title}}
          </a>
        </li>
      </ul>
    </div>

--

### Exercise 8

Lets create a Edit form

* create a new route called edit
* create a new templates called edit.html
* create a new controller called EditController
* create a button on show template to direct to Edit Route

--


#### app.js

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
          .state('show', {
            url: '/show/:id',
            templateUrl: '/templates/show.html',
            controller: 'ShowController'
          })
          .state('edit', {
            url: '/edit/:id',
            templateUrl: '/templates/edit.html',
            controller: 'EditController'
          })
      })

--

#### edit.html

    <div class="container">
      <h2>Edit</h2>
      <form ng-submit="update(thing)">
        <fieldset>
          <label>Title</label>
          <input class="u-full-width" type="text" ng-model="thing.title">
        </fieldset>
        <fieldset>
          <label>Description</label>
          <textarea class="u-full-width" ng-model="thing.description"></textarea>
        </fieldset>
        <button class="button-primary u-pull-right">Save</button>
        <a class="button u-pull-right" ui-sref="index">Cancel</a>
      </form>
    </div>

--

#### controllers.js

    angular.module('App')
      .controller('AddController', function($scope, bucketlist, $state) {
        $scope.add = function(thing) {
          thing._id = (new Date()).toISOString()
          bucketlist.put(thing)
            .then(function(res) {
              $state.go('main')
            })
        }
      })
      .controller('ListController', function($scope, bucketlist) {
        bucketlist.all().then(function(things){
          $scope.$apply(function() {
            $scope.bucketlist = things  
          })
        })
      })
      .controller('ShowController', function($scope, bucketlist, $stateParams) {
        bucketlist.get($stateParams.id).then(function(thing) {
          $scope.$apply(function() {
            $scope.thing = thing
          })
        })
      })
      .controller('EditController', function($scope, bucketlist, $stateParams, $state) {
        bucketlist.get($stateParams.id).then(function(thing) {
          $scope.$apply(function() {
            $scope.thing = thing
          })
        })
        $scope.update = function(thing) {
          bucketlist.put(thing)
            .then(function(res) {
              $state.go('show', { id: thing._id})
            })
        }
      })

--

#### show.html

    <div class="container">
      <h2>{{thing.title}}</h2>
      <p>{{thing.description}}</p>
      <a class="button" ui-sref="edit({ id: thing._id})">Edit</a>
      <a class="button" ui-sref="main">Bucket List</a>
    </div>

--

### Exercise 9

Adding a couple of items

...

--

Lets create a filter

   <input class="u-full-width" placeholder="find by title" type="text" ng-model="thing.title">

...

    <li ng-repeat="thing in bucketlist | filter:thing">
      <a ui-sref="show({ id: thing._id })">

--

