myApp.controller('FavoriteController', ['UserService', 'FavoriteService', function(UserService, FavoriteService) {
  console.log('FavoriteController created');

  var self = this;

  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.parkList = UserService.parkList;
  self.favoriteList = FavoriteService.favoriteList;

  FavoriteService.getFavorites(self.userObject._id);

  // Deletes Favorites. 
  self.deleteFavorites = function (favoriteId) {
    FavoriteService.deleteFavorites(favoriteId);
    FavoriteService.getFavorites(self.userObject._id);
  }



}]);
