myApp.controller('FavoriteController', ['UserService', 'FavoriteService', function(UserService, FavoriteService) {
  console.log('FavoriteController created');

  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.parkList = UserService.parkList;

  self.favoritePark = function (userId, parkId) {
    FavoriteService.favoritePark(userId, parkId);
  }
}]);
