  myApp.service('CrudService', ['$http', '$location', function($http, $location){
    console.log('CrudService loaded');
    
    var self = this;
    var fsClient = filestack.init('Ap5iwWk6nRwOwoqPQ3vZ9z');

    self.image = {list: []};
    self.userImage = {list: []};


    // ********* Photo Uploads *********
    self.openPicker = function (userId, parkCode, image) {
        fsClient.pick({
        fromSources:["local_file_system","url","imagesearch","facebook","instagram","dropbox"],
        accept:["image/*"]
        }).then(function(response) {
        self.image.list = response.filesUploaded;
        console.log('response from filestack', self.image.list);
            // declare this function to handle response
            self.addPhotos(userId, parkCode, self.image.list);
            // do something w/ the response data
        });
    }
    // function to handle filestack photo in openPicker function 
    self.addPhotos = function (user_id, parkId, response) {
        // loop through response array to get image url from filestack. 
        for(let i = 0; i < response.length; i++) {
            imgFile = response[i].url;
        }
        console.log(parkId);
        console.log(imgFile);
        
        let newImage = 
        {
            user_id,
            parkId,
            imgFile,
        }
        $http.post(`/api/user/parks/gallery`, newImage)
        .then(function(response) {
            console.log('successful post', response);
            self.getAllPhotos(parkId);
        })
        .catch(function (error) {
            console.log('error on post', error);
        })
    }

    // ********* Getting Photos *********
    self.getAllPhotos = function (parkId) {
        $http.get(`/api/user/parks/gallery/${parkId}`)
            .then(function (response) {
                self.image.list = response.data;
                console.log('All Images: ', self.image.list);
            },
            // error response of unauthorized (403)
            function(response) {
            console.log('error:', response);
        });
    }
    

}]);