var app = angular.module("app", []);

app.controller("testrunCtrl", function($scope, $http, testrunsService) {

  // pass the correpsonding collection JSON filename to the service to retreive the JSON
  $scope.search = function() {

    $scope.collectionSelect();
    testrunsService.updateTestrun($scope.collection);
    var promise = testrunsService.getTestrun();


    promise.then(function(data) {
      $scope.testruns = data.data.pagedResult.collectionInstance[0].actions.actions;
      $scope.parseJSON();
      // var ctx = document.getElementById("barChart").getContext("2d");
      //       console.log("in search " + $scope.datasets)

      // var barChart = new Chart(ctx).Bar($scope.datasets);

    });

  };

  // parse the json and store the matching entry data in an array, testruns
  $scope.parseJSON = function() {
    var matchStr = document.getElementById("searchInput").value;
    $scope.actions = [];
    var runs = $scope.testruns;
    $scope.labels = [];
    $scope.datasets = [];
    for (var i = 0; i < runs.length; i++) {
      console.log(runs[i]);
      var actions = [];
      action = runs[i];

      if (action.duration >= matchStr) {
        $scope.actions.push({
          name: runs[i].name,
          type: runs[i].type,
          state: runs[i].state,
          startTime: runs[i].startTime,
          endTime: runs[i].endTime,
          duration: runs[i].duration
        });

        // $scope.labels.push(runs[i].name);
        // $scope.datasets.push(runs[i].name, runs[i].state, runs[i].type, runs[i].duration, runs[i].startTime);
        // $scope.datasets.push({label: runs[i].type, fillColor: "fillColor: '#7BC225'",data: runs[i].duration});

      }
    }
  };

  $scope.collectionSelect = function() {
    var dropdown = document.getElementById("collectionSelect");
    var collectionSelectedIndex = dropdown.selectedIndex;
    var collectionSelected = dropdown.options[collectionSelectedIndex].value;

    console.log("in collectionSelect:  " + collectionSelected);

    switch (collectionSelected) {
      case "dte.28790405":
        $scope.collection = "actions-job-result.json";
        break;
      case "dte.28428001":
        $scope.collection = "actions-job-result-2json";
        break;
    }
  };


});

// Service to use http.get to retreive the JSON from a remote server.  If JSON is a local file the cross-site security error occurs.
app.service("testrunsService", function($http, $q) {
  var deferred = $q.defer();
  var testrun;


  this.updateTestrun = function(testrunsSelected) {
    testrun = testrunsSelected;
    console.log("in service:  " + testrunsSelected);
    $http.get('http://juubaker.github.io/' + testrunsSelected).then(function(data) {
      deferred.resolve(data);
    });
  };

  this.getTestrun = function() {
    return deferred.promise;
  };
});