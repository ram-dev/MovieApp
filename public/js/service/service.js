MovieApp.factory("MovieAppFactory", function ($resource) {
  return $resource("/movies");
});

MovieApp.factory('MovieApphistoryListFactory', function ($resource) {
  return $resource('/historyList');
});