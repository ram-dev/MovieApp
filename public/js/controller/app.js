window.MovieApp = angular.module("MovieApp", ["ngResource", "ngRoute"]);
 
MovieApp.controller("MovieAppController", function ($scope, $http, MovieAppFactory, $location) {
  $scope.headerSrc = "templates/header.html";
  $scope.movies = MovieAppFactory.query(); 
  $scope.currMovie = null;

  $scope.getMovieById = function (id) {
    var movies = $scope.movies;
    for (var i = 0; i < movies.length; i++) {
      var movie = $scope.movies[i];
      if (movie.id == id) {
        $scope.currMovie = movie;
      }
    }
  };

  $scope.back = function () {
    window.history.back();
  };  

  $scope.isActive = function (route) {
    return route === $location.path();
  };

  $scope.isActivePath = function (route) {
    return ($location.path()).indexOf(route) >= 0;
  };

  $scope.storeMovie = function(movie){    
    var formData = {};
    formData.movie_id = movie.id;
    formData.movie_name = movie.title;
    formData.movie_img = movie.images[0].url;
    formData.movie_des = movie.description; 
    $scope.processForm(formData); 
  };

  $scope.processForm = function (formData) {   
    $http({
      method: "POST",
      url: "/history",
      data: $.param(formData),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      } 
    })
    .success(function (data) {
        console.log(data);
    });
  };
 
});
 
MovieApp.controller("movieDetailsController", function ($scope, $routeParams) {
  $scope.getMovieById($routeParams.id);
});

MovieApp.controller("historyDetailsController", function ($scope, MovieApphistoryListFactory) {
  $scope.historyList = MovieApphistoryListFactory.query();

});
MovieApp.filter('unique', function() {
    return function(collection, keyname) {
       var output = [],
       keys = [];
       angular.forEach(collection, function(item) {
          var key = item[keyname];
          if (keys.indexOf(key) === -1) {
             keys.push(key);
             output.push(item);
        }
      });
      return output;
   };
})