  myApp.service('FilestackService', ['$http', '$location', function($http, $location){
    console.log('FilestackService loaded');
    
    var self = this;
    var fsClient = filestack.init('Ap5iwWk6nRwOwoqPQ3vZ9z');
    let images;

    self.userImage = {list: []};


    // ********* Photo Uploads *********
    self.openPicker = function (userId, parkCode, image) {
        
        fsClient.pick({
        fromSources:["local_file_system","url","imagesearch","facebook","instagram","dropbox"],
        accept:["image/*"]
        }).then(function(response) {
        self.userImage.list = response.filesUploaded;
        console.log('response from filestack', self.userImage.list);
            // declare this function to handle response
            self.addPhotos(userId, parkCode, self.userImage.list);
            // do something w/ the response data
        });
    }

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

        $http.post(`/api/user/parks/gallery/${user_id}`, newImage)
        .then(function(response) {
            console.log('successful post', response);
        })
        .catch(function (error) {
            console.log('error on post', error);
        })
    }

}]);