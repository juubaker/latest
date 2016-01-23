var app = angular.module("app", []);

app.controller("errorsCtrl", function($scope, $http, errorsCtrlService) {

  // pass the correpsonding container JSON filename to the service to retreive the JSON
  $scope.searchErrorMessages = function() {
    $scope.getErrorTypeJSON();

    errorsCtrlService.setErrorType($scope.errorType);
    var promise = errorsCtrlService.getErrors();
    promise.then(function(data) {
      $scope.oneTestRun = data.data.pagedResult.search[0].entities.entitiesDetail[0].lines.linesDetail;
      $scope.testRuns = data.data.pagedResult.search[0].entities.entitiesDetail;
      $scope.parseJSON();
    });
  }

  // handler for the error type dropdown
  $scope.getErrorTypeJSON = function() {
    var dropdown = document.getElementById("errorSelect");
    var errorTypeSelectedIndex = dropdown.selectedIndex;
    var errorTypeSelected = dropdown.options[errorTypeSelectedIndex].value;

    switch (errorTypeSelected) {
      case "Error":
        $scope.errorType = "search-error.json";
        break;
      case "IllegalArgumentException":
        $scope.errorType = "search-illegalargumentexception.json";
        break;
      case "NullPointerException":
        $scope.errorType = "search-nullpointerexception.json";
        break;
    };

  }

  // parse the json and store the matching entry data in an array, matchingFileNames
  $scope.parseJSON = function() {
    var matchStr = document.getElementById("searchInput").value;
    $scope.matchingFileNames = [];
    var runs = $scope.testRuns;
    console.log(runs);
    for (var i = 0; i < runs.length; i++) {
      console.log(runs[i].lines.linesDetail);
      var linesDetail = new Array();
      linesDetail = runs[i].lines.linesDetail;
      for (var j = 0; j < linesDetail.length; j++) {
        var pos = linesDetail[j].data.toLowerCase().indexOf("exception");

        if (pos >= 0 && !!runs[i] ) {
          $scope.matchingFileNames[i] = {
            name: runs[i].name,
            path: runs[i].name,
            lineNumber: linesDetail[j].lineNumber,
            data: linesDetail[j].data
          };
        }
      }
    }
  };

});

// Service to use http.get to retreive the JSON from a remote server.  If JSON is a local file the cross-site security error occurs.
app.service("errorsCtrlService", function($http, $q) {
  var deferred = $q.defer();
  var errorType;

  this.setErrorType = function(errorTypeSelected) {
    errorType = errorTypeSelected;
    $http.get('http://juubaker.github.io/' + errorType).then(function(data) {
      deferred.resolve(data);
    });
  };

  this.getErrors = function() {
    return deferred.promise;
  };
});