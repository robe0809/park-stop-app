myApp.controller('FavoriteController', ['UserService', 'FavoriteService', function (UserService, FavoriteService) {
  console.log('FavoriteController created');

  var self = this;
  let parkId;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.userName = UserService.userName;
  self.parkList = UserService.parkList;
  self.favoriteList = FavoriteService.favoriteList;
  self.nationalPark = UserService.nationalPark;

  // Deletes Favorites. 
  self.deleteFavorites = function (favoriteId) {
    FavoriteService.deleteFavorites(favoriteId);
    FavoriteService.getFavorites(self.userObject._id);
  }
  self.parkDescription = function (parkSelected) {
      UserService.parkDescription(parkSelected);
  }

  FavoriteService.getFavorites(self.userObject._id);
}]);
