myApp.service('UserService', ['$http', '$location', function($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.parkList = {list: []};

  // bring over to park service
  self.searchPark = function (parkSelected) {
      let apiKey = 'api_key=0HAwxOXCJ9LeZrJ9DFGv9eIYpl0a8tHap2yWMkaq';
      // getting each park Description by parkCode
      $http.get(`https://developer.nps.gov/api/v1/parks/?parkCode=${parkSelected}&fields=images&` + apiKey)
      .then(function (response) {
          self.parkList.list = response.data;
          console.log('successful get parks', self.parkList.list);
          $location.path("/parks/description");
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
            self.userObject.userName = response.data.username;
            console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
        } else {
            console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    },function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },

  self.logout = function() {
    console.log('UserService -- logout');
    $http.get('/api/user/logout').then(function(response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });
  }
}]);
