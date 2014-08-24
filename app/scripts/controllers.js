'use strict';
angular.module('Ionictut.controllers', [])

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('main');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})

.controller('MainCtrl', function($scope, $state, $http, $q, $log) {
  $scope.$log = $log;
  $scope.isActive = false;
  //console.log('MainCtrl');
  
  $scope.init = function(){
    
    $scope.getImages()
    .then(function(res){
        //success
        //console.log('Images: '+res);
        $scope.imageList = res.shots;
    }, function(status){
      // err
      //console.log('Error: '+status);
      $scope.pageError = status;
    });
  };

  $scope.getImages = function(){
    var defer = $q.defer();

    $http.jsonp('http://api.dribbble.com/shots/popular?callback=JSON_CALLBACK')
      .success(function(res){
        defer.resolve(res)
      })
      .error(function(status, err){
        defer.reject(status);
      });

    return defer.promise;

  };
  

  $scope.init();
  // $scope.toIntro = function(){
  //   $state.go('intro');
  // }
});
