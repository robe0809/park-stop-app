myApp.controller('FavoriteController', ['UserService', 'FavoriteService', function (UserService, FavoriteService) {
    console.log('FavoriteController created');

    var self = this;

    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.userName = UserService.userName;
    self.parkList = UserService.parkList;
    self.favoriteList = FavoriteService.favoriteList;
    self.nationalPark = UserService.nationalPark;

    // Get parkDescription
    self.parkDescription = function (parkSelected) {
        UserService.parkDescription(parkSelected);
    }

    // Deletes Favorites. 
    self.deleteFavorites = function (favoriteId) {
        FavoriteService.deleteFavorites(favoriteId);
        FavoriteService.getFavorites(self.userObject._id);
    }

    FavoriteService.getFavorites(self.userObject._id);

}]);
