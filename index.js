var adventure = require('adventure');
var shop = adventure('ng-adventure');

shop.add('setup - create index.html', function () { return require('./setup') });
shop.add('exercise1 - databinding', function () { return require('./ex1') });
shop.add('exercise2 - routing', function () { return require('./ex2') });
shop.add('exercise3 - routting to forms', function () { return require('./ex3') });
shop.add('exercise4 - services', function () { return require('./ex4') });
shop.add('exercise5 - forms to list', function () { return require('./ex5') });
shop.add('exercise6 - ng-repeat', function () { return require('./ex6') });

shop.execute(process.argv.slice(2));