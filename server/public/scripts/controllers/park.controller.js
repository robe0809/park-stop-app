myApp.controller('ParkController', ['UserService', 'ParkService', 'FavoriteService', '$mdDialog', function (UserService, ParkService, FavoriteService, $mdDialog) {
    console.log('ParkController created');

    var self = this;
    let parkCode;
    let thisIndex;

    // From User and Favorite Services
    self.userService = UserService;
    self.parkList = UserService.parkList;
    self.userName = UserService.userName;
    self.userObject = UserService.userObject;
    self.infoList = UserService.infoList;
    self.favoriteList = FavoriteService.favoriteList;

    // From Filestack Service
    self.image = ParkService.image;
    self.nationalPark = UserService.nationalPark;

    // Favorites parks And adds them to the favorites page. 
    self.favoritePark = function (parkName, userId, parkId) {
        FavoriteService.favoritePark(parkName, userId, parkId);
    }

    // getting park descriptions
    self.parkDescription = function (parkSelected) {
        UserService.parkDescription(parkSelected);
    }


    // Getting park articles and events
    self.parkInfo = function (currentNavItem, parkSelected) {
        if (currentNavItem == 'gallery') {
            ParkService.getAllPhotos(parkSelected);
        } else if (currentNavItem == 'reviews') {
            ParkService.getReviews(parkSelected);
        }
        else {
            UserService.parkInfo(currentNavItem, parkSelected);
        }
    }

    // Deletes Users photos 
    self.deleteUserPhotos = function (imageId, parkId) {
        ParkService.deleteUserPhotos(imageId);
        ParkService.getAllPhotos(parkId);
    }

    // Filestack function for uploading photos
    self.openPicker = function (userId, parkId, image) {
        ParkService.openPicker(userId, parkId, image);
    }

    // ************* Modal for Edit *************
    self.showAdvanced = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            controllerAs: "vm",
            templateUrl: '../../views/templates/editPhoto.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
    };

    // ************* gets index of image *************
    self.setIndex = function (index) {
        thisIndex = index
    };

    // ************* Controller function for Modal *************
    function DialogController($mdDialog) {
        var self = this;


        console.log('index', self.imageId);

        self.image = ParkService.image;
        self.imageId = self.image.list[thisIndex]._id;
        self.userObject = UserService.userObject;
        self.parkList = UserService.parkList;


        self.hide = function () {
            $mdDialog.hide();
        };

        self.cancel = function () {
            $mdDialog.cancel();
        };

        self.addDescription = function (imageId, description, parkId) {
            console.log(self.imageId);
            ParkService.addDescription(imageId, description, parkId)
            $mdDialog.cancel();
        }


    };

}]);
