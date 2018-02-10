var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  console.log('myApp -- config')
  $routeProvider
    .when('/', {
      redirectTo: 'home'
    })
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as vm',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as vm'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/favorites', {
      templateUrl: '/views/templates/favorites.html',
      controller: 'FavoriteController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/parks/description', {
      templateUrl: '/views/templates/description.html',
      controller: 'UserController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })

    
    // .when('/parks/articles', {
    //   templateUrl: '/views/templates/articles.html',
    //   controller: 'ParkController as vm',
    //   resolve: {
    //     getuser : function(UserService){
    //       return UserService.getuser();
    //     }
    //   }
    // })
    // .when('/parks/events', {
    //   templateUrl: '/views/templates/events.html',
    //   controller: 'ParkController as vm',
    //   resolve: {
    //     getuser : function(UserService){
    //       return UserService.getuser();
    //     }
    //   }
    // })
    // .when('/parks/gallery', {
    //   templateUrl: '/views/templates/gallery.html',
    //   controller: 'ParkController as vm',
    //   resolve: {
    //     getuser : function(UserService){
    //       return UserService.getuser();
    //     }
    //   }
    // })
    // .when('/parks/reviews', {
    //   templateUrl: '/views/templates/reviews.html',
    //   controller: 'ParkController as vm',
    //   resolve: {
    //     getuser : function(UserService){
    //       return UserService.getuser();
    //     }
    //   }
    // })
    .otherwise({
      template: '<h1>404</h1>'
    });
}]);
