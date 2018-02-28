myApp.service('UserService', ['$http', '$location', function ($http, $location) {
    console.log('UserService Loaded');

    var self = this;
    let parkPhotos;

    self.userObject = {};
    self.userName = {};
    self.nationalPark;
    self.parkList = { list: [] };
    self.infoList = { list: [] };

    // ********* Getting nationalPark info *********
    self.nationalPark = function () {
        $http.get('/api/user/nationalParks')
        .then(function (response) {
            console.log('national park arr', response.data);
            self.nationalPark = response.data;
        })
        .catch(function (error) {
            console.log('error on getting park arr', error);
        })
    }
    self.nationalPark();
    
    // ********* Getting Park Description *********
    self.parkDescription = function (parkSelected) {
        let parkCode = parkSelected.code;
        $http.get('/api/user/parkInfo/' + parkCode)
            .then(function (response) {
                self.parkList.list = response.data;
                console.log('successful get parks', self.parkList.list);
                $location.path("/parks/description")
            })
            .catch(function (error) {
                console.log('error on getting parks', error);
            });
    }

    // ********* Getting Park Information (articles/events) *********
    self.parkInfo = function (currentNavItem, parkSelected) {
        $http.get(`/api/user/parkInfo/${currentNavItem}/${parkSelected}`)
            .then(function (response) {
                self.infoList.list = response.data;
                console.log('successful get parks', self.infoList);
                $location.path(`/parks/${currentNavItem}`);
            })
            .catch(function (error) {
                console.log('error on getting parks', error);
            });
    }

    // ********* Getting User Information *********
    self.getuser = function () {
        console.log('UserService -- getuser');
        $http.get('/api/user').then(function (response) {
            if (response.data.username) {
                // user has a curret session on the server
                self.userObject = response.data;
                self.userName.username = response.data.username;
                console.log('UserService -- getuser -- User Data: ', response.data);
            } else {
                console.log('UserService -- getuser -- failure');
                // user has no session, bounce them back to the login page
                $location.path("/user");
            }
        }, function (response) {
            console.log('UserService -- getuser -- failure: ', response);
            $location.path("/user");
        });
    },

        self.logout = function () {
            console.log('UserService -- logout');
            $http.get('/api/user/logout').then(function (response) {
                console.log('UserService -- logout -- logged out');
                $location.path("/user");
            });
        }


}]);
