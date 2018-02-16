myApp.controller('FavoriteController', ['UserService', 'FavoriteService', function(UserService, FavoriteService) {
  console.log('FavoriteController created');

  var self = this;

  self.userObject = UserService.userObject;
  self.parkList = UserService.parkList;

      // Getting park articles and events
      self.favoriteInfo = function(currentNavItem, userId) { 
        if(currentNavItem == 'favorites') {
            FavoriteService.getFavorites(userId);
        } 
    }

}]);
