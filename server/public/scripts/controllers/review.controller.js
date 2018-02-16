myApp.controller('ReviewController', ['UserService', 'ParkService','$mdDialog', function(UserService, ParkService, $mdDialog) {
    console.log('ReviewController created');
    
      var self = this;

      let parkCode;
      // From User Service 
      self.userService = UserService;
      self.parkList = UserService.parkList;
      self.userObject = UserService.userObject;
      self.infoList = UserService.infoList;
      self.reviewList = ParkService.reviewList;

    // Using this function to enable users to see all reviews for each park
    // when hittin the reviews tab. 
    self.parkInfo = function(currentNavItem, parkSelected) {  
        if(currentNavItem == 'gallery') {
            console.log('parkSelect'. parkSelected);
            
             // once gallery tab is clicked this function gets photos and displays them on the DOM
            ParkService.getAllPhotos(parkSelected);
        } else if (currentNavItem == 'reviews') {
            console.log('parkselect', parkSelected);
             // once review tab is clicked this function gets reviews and displays them on the DOM
            ParkService.getReviews(parkSelected);
        }
        else {
            // this displays articles when the "articles" tab is clicked or events when the "events" tab is clicked;
            UserService.parkInfo(currentNavItem, parkSelected);
        }
    }
    self.deleteReview = function (reviewId, parkId) {
        ParkService.deleteReview(reviewId, parkId);
        ParkService.getReviews(parkId);
    }

    // this function displays a modal form when the "add review" button is clicked.
    self.showAdvanced = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          controllerAs: "vm",
          templateUrl: '../../views/templates/dialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        })
    };

    // Modal Controller
    function DialogController($mdDialog) {
        var self = this;
        self.firstRate = 0;
        self.parkList = UserService.parkList;
        self.userObject = UserService.userObject;

        self.onItemRating = function(rating){
          alert('On Rating: ' + rating);
        };

        self.hide = function() {
            $mdDialog.hide();
        };

        self.cancel = function() {
            $mdDialog.cancel();
        };

        self.submitReview = function (user_id, ratings, comment, parkId) {
            ParkService.submitReview(user_id, ratings, comment, parkId);
            $mdDialog.hide();
        }
    };

  }]);