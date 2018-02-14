myApp.service('UserService', ['$http', '$location', function($http, $location){
  console.log('UserService Loaded');

  var self = this;
  
  self.userObject = {};
  self.parkList = {list: []};
  self.infoList = {list: []};

  // ********* Getting Park Description *********
  self.parkDescription = function (parkSelected) { 
    let apiKey = 'api_key=iDOsJBB3crCSr0az2nRrlnwF6wYA01eSVGRJMn0v';
    // getting each park by parkCode
    $http.get(`https://developer.nps.gov/api/v1/parks?parkCode=${parkSelected.code}&` + apiKey)
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
    let apiKey = 'api_key=iDOsJBB3crCSr0az2nRrlnwF6wYA01eSVGRJMn0v';
    // getting each park by parkCode
    $http.get(`https://developer.nps.gov/api/v1/${currentNavItem}?parkCode=${parkSelected}&` + apiKey)
    .then(function (response) {
        self.infoList.list = response.data;
        console.log('successful get parks', self.infoList.list);
        $location.path(`/parks/${currentNavItem}`);
    })
    .catch(function (error) {
        console.log('error on getting parks', error);
    });
  }
  
  // ********* Getting User Information *********
  self.getuser = function(){
    console.log('UserService -- getuser');
    $http.get('/api/user').then(function(response) {
        if(response.data.username) {
            // user has a curret session on the server
            self.userObject = response.data;
            console.log('UserService -- getuser -- User Data: ', response.data);
        } else {
            console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/user");
        }
    },function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/user");
    });
  },

  self.logout = function() {
    console.log('UserService -- logout');
    $http.get('/api/user/logout').then(function(response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/user");
    });
  }


}]);
