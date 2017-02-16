MovieApp.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "templates/home.html",
      controller: "MovieAppController"
    })
    .when("/movie/:id", {
      templateUrl: "templates/movie.html",
      controller: "movieDetailsController"
    })    
    .when("/history", {
      templateUrl: "templates/history.html",
      controller: "historyDetailsController"
    })
    .otherwise({
        redirectTo: "/"
    });
});