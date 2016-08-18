import angular from "angular"
import 'angular-route'


angular.module("myApp", ['ngRoute'])

.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: '/views/home.html',
    access:{restricted:true},
    controller: 'logoutController'
  })

  .when('/login', {
    templateUrl: '/views/login.html',
    access:{restricted:true},
    controller: 'loginController'
  })

  .when('/logout', {
    templateUrl: '/views/logout.html',
    access:{restricted:true},
    controller: 'logoutController'
  })

  .when('/register', {
    templateUrl: '/views/register.html',
    access:{restricted:false},
    controller: 'registerController'
  })

  .when('/seek', {
    templateUrl: '/views/seek.html',
    access:{restricted:true},
    controller: 'logoutController'
  })

  .otherwise({
    redirectTo:'/'
  });

})


.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
      });
  });
});


let login = require('./login.js');
let register = require('./register.js');
let logout = require('./logout.js');
let service = require('./services.js');
// let countdown = require('./countdown.js');
