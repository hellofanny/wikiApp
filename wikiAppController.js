var app = angular.module("wikiApp", []);

var messageDisplay = document.getElementById("message");
var messageDisplayQuery = document.getElementById("messageQuery");

app.controller("wikiAppController", function ($scope, $http) {

    $scope.search = function () {

        messageDisplay.innerHTML = "";
        messageDisplayQuery.innerHTML = "";

        $scope.results = [];

        var searchKey = $scope.searchKey;
        var api = "https://en.wikipedia.org/w/api.php?action=query&format=json&gsrlimit=7&generator=search&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=overflow&origin=*&gsrsearch=";

        console.log(api + searchKey);

        if (searchKey === "") {
            messageDisplay.innerHTML = "Please, tell me what are you looking for 🤓";
            $("#search-container").effect('shake', { distance: 10});
        }

        else {
            $http.get(api + searchKey).then(function (response) {

                if (!response.data.hasOwnProperty('query')) {
                   // console.log(response.data);
                    messageDisplay.innerHTML = "Sorry, couldn't find what you are looking for 🤔";
                } else {
                    var results = response.data.query.pages;
                    messageDisplayQuery.innerHTML = 'Top 7 Wiki Search Results for "'+ searchKey + '"';
                    angular.forEach(results, function (result) {
                        $scope.results.push({ title: result.title, description: result.extract })
                    })
                }

            }, function (response) {
                //Second function handles error
                messageDisplay.innerHTML = "Something went wrong, please try again.";
                console.log("Something went wrong.");
            });
        }

    }

});


// Get the input field
var input = document.getElementById("inputKey");
input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("searchBtn").click();
  }
});

