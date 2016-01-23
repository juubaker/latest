var app = angular.module("app", []);

app.controller("ecidCtrl", function($scope, $http, ecidService) {

  // add onclick event to table row
  function addRowHandlers() {
    var rows = document.getElementById("ecidsFoundTbl").rows;
    for (i = 0; i < rows.length; i++) {
        rows[i].onclick = function(){ return function(){
               var id = this.cells[0].innerHTML;
               alert("id:" + id);
        };}(rows[i]);
    }
   }
   window.onload = addRowHandlers();

  // pass the correpsonding container JSON filename to the service to retreive the JSON
  $scope.searchECID = function() {
    $scope.containerSelect();
    ecidService.updateEcid($scope.container);
    var promise = ecidService.getEcid();

    promise.then(function(data) {
      $scope.oneTestRun = data.data.pagedResult.search[0].entities.entitiesDetail[0].lines.linesDetail;
      $scope.testRuns = data.data.pagedResult.search[0].entities.entitiesDetail;
      $scope.parseJSON();

    });

  };

  // handler for the container dropdown
  $scope.containerSelect = function() {
    var dropdown = document.getElementById("containerSelect");
    var containerSelectedIndex = dropdown.selectedIndex;
    var containerSelected = dropdown.options[containerSelectedIndex].value;

    console.log("in containerSelect:  " + containerSelected);

    switch (containerSelected) {
      case "AdminServer":
        $scope.container = "search-event-view-ecid-aa04b5d0db9e65dc:3e7b6e52:15068bd6990:-8000-0000000000000002.json";
        break;
      case "CoreSetupServer":
        $scope.container = "search-event-view-ecid-0058XfwMFzUFCCPLIek3yf0006ZW0001ze.json";
        break;
    }
  };

  // parse the json and store the matching entry data in an array, ecids
  $scope.parseJSON = function() {
    var matchStr = document.getElementById("searchInput").value;
    $scope.ecids = [];
    var runs = $scope.testRuns;
    console.log("parse JSON ecids length is " + $scope.ecids.length);
    for (var i = 0; i < runs.length; i++) {
      console.log(runs[i].lines.linesDetail);
      var linesDetail = new Array();
      linesDetail = runs[i].lines.linesDetail;
      for (var j = 0; j < linesDetail.length; j++) {
        console.log("name = " + runs[i].name);
        var pos = linesDetail[j].id = matchStr;

        if (pos >= 0) {
          $scope.ecids.push({
            name: runs[i].name,
            id: linesDetail[j].id,
            lineNumber: linesDetail[j].lineNumber,
            time: linesDetail[j].time,
            data: linesDetail[j].data
          });
        }
      }
    }
    console.log("ecids length is now " + $scope.ecids.length);

  };

  // display the data from the JSON corresponding to the selected row.
  $scope.openData = function() {
    var ecidsTable = document.getElementById('ecidsFoundTbl');

    $('#ecidsFoundTbl > > tbody > tr').click(function() {
      var dataDisplay = document.getElementById('dataDisplay');
      dataDisplay.setValue($scope.ecids[row].data);
    });
  }
});

// Service to use http.get to retreive the JSON from a remote server.  If JSON is a local file the cross-site security error occurs.
app.service("ecidService", function($http, $q) {
  var deferred = $q.defer();
  var ecid;


  this.updateEcid = function(ecidSelected) {
    ecid = ecidSelected;
    console.log("in service:  " + ecidSelected);
    $http.get('http://juubaker.github.io/' + ecidSelected).then(function(data) {
      deferred.resolve(data);
    });
  };

  this.getEcid = function() {
    return deferred.promise;
  };
});