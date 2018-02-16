myApp.service('FavoriteService', ['$http', '$location', function($http, $location){
    console.log('FavoriteService Loaded');
  
    var self = this;
    let parkPhotos;
  
    self.FavoriteObject = {};
    self.parkList = {list: []};
    self.infoList = {list: []};
    self.favoriteList = {list: []};

    // ********* Posting favorite parks to the data base *********
    self.favoritePark = function (user_id, parkId) {
        let newFavorite = {
            user_id, 
            parkId,
        }
        $http.post('/api/user/favorites', newFavorite)
        .then(function (response) {
            console.log('successful favorite post ', response);
        })
        .catch(function(error) {
            console.log('error on favorite post', error);
        })
    }
    self.getFavorites = function (user_id) {
        $http.get(`/api/user/favorites/${user_id}`) 
        .then(function (response) {
            console.log('successful get on favorite', response);
        })
        .catch(function (error) {
            console.log('error on get favorites', error);
        })
    }
  
  }]);