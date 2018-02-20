var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'jkAngularRatingStars']);

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', '$mdThemingProvider', function ($routeProvider, $locationProvider, $mdThemingProvider) {

  // Theme for web app
  $mdThemingProvider.theme('default')
    .primaryPalette('brown')
    .accentPalette('grey')
    .dark();


  console.log('myApp -- config')
  $routeProvider
    .when('/', {
      redirectTo: 'user'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'LoginController as vm',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as vm'
    })
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'ParkController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })

    // routes to description page
    .when('/parks/description', {
      templateUrl: '/views/templates/description.html',
      controller: 'ParkController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })

    // routes to articles page
    .when('/parks/articles', {
      templateUrl: '/views/templates/articles.html',
      controller: 'ParkController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    // routes to events page
    .when('/parks/events', {
      templateUrl: '/views/templates/events.html',
      controller: 'ParkController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })

    // routes to gallery page
    .when('/parks/gallery', {
      templateUrl: '/views/templates/gallery.html',
      controller: 'ParkController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })

    .when('/parks/reviews', {
      templateUrl: '/views/templates/reviews.html',
      controller: 'ReviewController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })

    .when('/favorites', {
      templateUrl: '/views/templates/favorites.html',
      controller: 'FavoriteController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      template: '<h1>404</h1>'
    });
}]);
