var app = angular.module("wikiApp", []);
app.controller("wikiAppController", function ($scope, $http) {
    
    $scope.search = function () {

        $scope.results = [];

        var searchKey = $scope.searchKey;
        var api = "https://en.wikipedia.org/w/api.php?action=query&format=json&gsrlimit=5&generator=search&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=overflow&origin=*&gsrsearch=";

        $http.get(api+searchKey).then(function (response) {

            var results = response.data.query.pages;
            console.log(results);

            angular.forEach(results, function (result) {
                $scope.results.push({ title: result.title, description: result.extract})
            })

        });
    }

});

