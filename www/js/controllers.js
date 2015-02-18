var profile = {
  firstname: null,
  lastname: null,
  lastConnection: null,
  token: null
};

angular.module('starter.controllers', [])

.controller('AppCtrl', ['$scope', '$ionicModal', '$http', 'sessionService', function($scope, $ionicModal, $http, sessionService) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $http.post(
      'http://www.coeurro.com/vistagram_plateform_sf2/web/app_dev.php/mobile/connection',
      'username='+$scope.loginData.username+'&password='+$scope.loginData.password,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
      ).success(function (response) {
        console.log(response);
        if (response.success) {
          sessionService.persist('firstname', response.firstname);
          $scope.closeLogin();
        } else {
          $scope.connectionStatus = response.error
        }
      });
  };
}])

.controller('HomeCtrl', ['$scope', 'sessionService', function($scope, sessionService) {
  $scope.firstname = sessionService.get('firstname') ;
}]);
