var multiline = require('multiline')
var verify = require('adventure-verify')
var fs = require('fs')
var path = require('path')

exports.problem = multiline(function() { /* 
### Exercise 6

Now that we have our list, lets render it to our main template using ng-repeat

--

main.html

    <h1>My Bucket List</h1>
    <a class="button button-primary" ui-sref="add">Add</a>
    <ul>
      <li ng-repeat="thing in bucketlist">
        {{thing.title}}
      </li>
    </ul>

*/})

exports.verify = verify(function(args, t) {
  t.end()
})