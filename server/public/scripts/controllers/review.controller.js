myApp.controller('ReviewController', ['UserService', 'CrudService','$mdDialog', function(UserService, CrudService, $mdDialog) {
    console.log('ReviewController created');
    
      var self = this;

      let parkCode;
      // From User Service 
      self.userService = UserService;
      self.parkList = UserService.parkList;
      self.userObject = UserService.userObject;
      self.infoList = UserService.infoList;

      
    self.showAdvanced = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          controllerAs: "vm",
          templateUrl: '../views/templates/dialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        })
        .then(function(answer) {
          self.status = 'You said the information was "' + answer + '".';
        }, function() {
          self.status = 'You cancelled the dialog.';
        });
    };

    // Modal Controller
    function DialogController($mdDialog) {
        self.hide = function() {
            $mdDialog.hide();
        };

        self.cancel = function() {
            $mdDialog.cancel();
        };

        self.answer = function(answer) {
            $mdDialog.hide(answer);
        };
        
        self.submitReview = function () {

        }
    };

  }]);