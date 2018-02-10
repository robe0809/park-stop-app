myApp.controller('FavoriteController', ['UserService', function(UserService) {
  console.log('FavoriteController created');

  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
}]);
