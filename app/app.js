/*
TODO:
[ 1/2 ] List of all public repos from github
[ x ] Show the sum of subscribers of all selected public repos from the list at the header.
[ x ] Show the sum of all selected public repos from the list at the footer.
[ x ] Style with bootstrap.
*/

var myAppModule = angular.module('myApp', []).controller('myctrl', ['$scope', '$http', function($scope, $http){
    
    $scope.totalSelected = 0;

    $http({
            method: 'GET',
            url: 'https://api.github.com/orgs/angular'+ '?access_token=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' })
            //url: 'https://api.github.com/orgs/'+ '?access_token=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' })
            .then(function(response) {
                $scope.org = response.data;
            }, function(error) {
                displayError("Something went wrong");
            });

    $http({
            method: 'GET',
            url: 'https://api.github.com/orgs/angular/members'+ '?access_token=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' })
            .then(function(response) {
            $scope.members = response.data;
        }, function(error) {
            displayError("Something went wrong");
        });

    $http({
            method: 'GET',
            url: 'https://api.github.com/orgs/angular/members?page=2'+ '&access_token=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' })
            .then(function(response) {
                $scope.members2 = response.data;
            }, function(error) {
                displayError("Something went wrong");
            });

    $http({
            method: 'GET',
            url: 'https://api.github.com/orgs/angular/members?page=3'+'&access_token=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' })
            .then(function(response) {
                $scope.members3 = response.data;
            }, function(error) {
                displayError("Something went wrong");
            });

    $http({
            method: 'GET',
            url: 'https://api.github.com/users' + '?access_token=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' })
            .then(function(response) {  
                $scope.user = response.data;
                $scope.memberall = $scope.members.concat($scope.members2, $scope.members3);
                
                $scope.memberall.forEach(function(value, index) {
                    $http.get("https://api.github.com/users/" + value.login + '?access_token=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').then(function(res) {
                        //console.log(res.data.public_repos);
                        console.log(res.data.public_repos);
                        value.nbrRepos = res.data.public_repos;
                    });
                })
            }, function(error) {
                displayError("Something went wrong");
            });

    $scope.updateTotal = function(item) {
                    
        if (item) {
            $scope.totalSelected++;
        }
        else {
            $scope.totalSelected--;
        }
    }
            
}]);