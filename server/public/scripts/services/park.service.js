myApp.service('ParkService', ['$http', '$location', function ($http, $location) {
    console.log('ParkService loaded');

    var self = this;
    var fsClient = filestack.init('Ap5iwWk6nRwOwoqPQ3vZ9z');

    self.image = { list: [] };
    self.userImage = { list: [] };
    self.reviewList = { list: [] };
    self.descriptions = { list: [] };
    
    // ********* Photo Uploads *********
    self.openPicker = function (userId, parkCode, image) {
        fsClient.pick({
            fromSources: ["local_file_system", "url", "imagesearch", "facebook", "instagram", "dropbox"],
            accept: ["image/*"]
        }).then(function (response) {
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
        for (let i = 0; i < response.length; i++) {
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
            .then(function (response) {
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
                console.log('All descriptions: ', self.image.list);
            })
            // error response of unauthorized (403)
            .catch(function (error) {
                console.log('error on post', error);
            })
    }

    // ********* Deleting User Photos ********* 
    self.deleteUserPhotos = function (imageId) {
        $http.delete(`/api/user/parks/gallery/${imageId}`)
            .then(function (response) {
                self.image.list = response.data;
                console.log('user Images', self.image.list);
            })
            .catch(function (error) {
                console.log('error on getuser photos', error);
            })
    }

    // ********* Adding Photo Descriptions *********
    self.addDescription = function (user_id, imageId, description) {
        let newDescription =
            {
                user_id,
                imageId,
                description,
            }
        $http.post(`/api/user/parks/gallery`, newDescription)
            .then(function (response) {
                console.log('successful post', response);
            })
            .catch(function (error) {
                console.log('error on post', error);
            })
    }

    // ********* Adding Reviews *********
    self.submitReview = function (username, user_id, ratings, comment, parkId) {
        let newReview = {
            username,
            user_id,
            ratings,
            comment,
            parkId,
        }
        $http.post('/api/user/parks/reviews', newReview)
            .then(function (response) {
                console.log('successful review post', response);
                self.getReviews(parkId); // gets the review that was just posted and displays it on the DOM
            })
            .catch(function (error) {
                console.log('error on posting reviews', error);
            })
    }
    // ********* Getting Reviews *********
    self.getReviews = function (parkId) {
        $http.get(`/api/user/parks/reviews/${parkId}`)
            .then(function (response) {
                self.reviewList.list = response.data;
                console.log('All Reviews: ', self.reviewList.list);
            })
            // error response of unauthorized (403)
            .catch(function (error) {
                console.log('error on post', error);
            })
    }
    // ********* Deleting User Reviews ********* 
    self.deleteReview = function (reviewId) {
        console.log(reviewId);

        $http.delete(`/api/user/parks/reviews/${reviewId}`)
            .then(function (response) {
                self.reviewList.list = response.data;
                console.log('user reviews', self.reviewList.list);
            })
            .catch(function (error) {
                console.log('error on delete reviews', error);
            })
    }

}]);