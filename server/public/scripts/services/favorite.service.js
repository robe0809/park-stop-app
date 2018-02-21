myApp.service('FavoriteService', ['$http', '$location', '$mdToast', function ($http, $location, $mdToast) {
    console.log('FavoriteService Loaded');

    var self = this;
    let favoriteArr;
    let isDuplicate;
    let last = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };

    self.FavoriteObject = {};
    self.parkList = { list: [] };
    self.infoList = { list: [] };
    self.favoriteList = { list: [] };

    // ********* Posting favorite parks to the data base *********
    self.favoritePark = function (parkName, user_id, parkId) {
        let newFavorite = {
            parkName,
            user_id,
            parkId,
        }
        
        return $http.post('/api/user/favorites', newFavorite)
            .then(function (response) {
                if (response.data.response) {
                    swal(response.data.response);
                } else {
                    self.showSimpleToast();
                    self.getFavorites(user_id);
                    console.log('successful favorite post ', response);
                };
            })
            .catch(function (error) {
                console.log('error on favorite post', error.error);
            })
    }

    // toast to let users know that they have favorited a park.
    self.toastPosition = angular.extend({}, last);

    self.getToastPosition = function () {
        return Object.keys(self.toastPosition)
            .filter(function (pos) { return self.toastPosition[pos]; })
            .join(' ');
    };

    self.showSimpleToast = function () {
        var pinTo = self.getToastPosition();

        $mdToast.show(
            $mdToast.simple()
                .textContent(`You've successfully favorited this park!`)
                .position(pinTo)
                .hideDelay(3000)
        );
    };

    // gets all favorites for whoever is logged in  and displays them on the DOM. 
    self.getFavorites = function (user_id) {
        $http.get(`/api/user/favorites/${user_id}`)
            .then(function (response) {
                self.favoriteList.list = response.data;
                console.log('successful get on favorite', self.favoriteList.list);
            })
            .catch(function (error) {
                alert(error);
                console.log('error on get favorites', error);
            })
    }

    self.deleteFavorites = function (favoriteId) {
        $http.delete(`/api/user/favorites/${favoriteId}`)
            .then(function (response) {
                console.log('successful favorite delete', response);
                // get 
            })
            .catch(function (error) {
                console.log('error on delete favorites', error);
            })
    }

}]);