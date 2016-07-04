'use strict';

LeadisControllers.controller('userController', ['$scope', '$http', function($scope, $http) {
	$scope.message = "user";
	$scope.login = "login";
	$scope.register = "register";
	$scope.edit = "edit account infos";
	$scope.user = null;
	$scope.details = "vide";
	$scope.nbvar = 1;
	$scope.usertoken = "token";

	var alertMessage = "please fill in the form correctly.";

	var newLogin = $scope.newLogin = {
										"Email": null,
										"Password": null,
									};

	var newUser = $scope.newUser = {
										"Pseudo" : null, 
										"Password": null,
										"Email": null,
										"Name": null,
										"FirstName": null
									};

	var editInfo = $scope.editInfo = {
										"Email": null,
										"FirstName": null,
										"Name": null,
										"Password": null,
									};

	var loginInfo = $scope.loginInfo = { "Pseudo" : null, "Password": null };

	var checkDataForm = function()
	{
		if (newUser.Pseudo && newUser.Password && newUser.Email && newUser.Name && newUser.FirstName)
			return true;
		return false;
	};

	$scope.create_user = function()
	{
		if (checkDataForm() == false)
			alert(alertMessage);

		$http({
			method: 'POST',
			url: 'http://api-leadisjourney.azurewebsites.net/v0.1/api/account',
			data: {
			 			"Pseudo" : newUser.Pseudo,
			 			"Password" : newUser.Password,
			 			"Email" : newUser.Email,
			 			"Name" : newUser.Name,
			 			"FirstName" : newUser.FirstName
			 		}
			}).then(function(result) {console.log(result)},
			function(error) {console.log(error)});
	};

	$scope.login_user = function()
	{
		$http.post('http://api-leadisjourney.azurewebsites.net/v0.1/api/account/login', {
			"Email" : loginInfo.Email,
			"Password" : loginInfo.Password
		}).then(function(result) {
				console.log(result)
				$scope.user = {
				"Email" : loginInfo.Email,
				"Password" : loginInfo.Password
			};
		}, function(error) {console.log(error)});
	};

	$scope.logout_user = function()
	{
		$scope.user = null;
	}

	$scope.infos_user = function(nb)
	{
		$http({
			method: 'GET',
			url: 'http://api-leadisjourney.azurewebsites.net/v0.1/api/account/'+nb
		}).then(function successCallback(response) {
        	$scope.details = response.data;
        }, function errorCallback(response) {
			alert("Error: " + response.statusText);
		});
	};

	$scope.edit_user_info = function()
	{
		$http({
			method: 'POST',
			url: 'http://api-leadisjourney.azurewebsites.net/v0.1/api/account',
			data: {
				"Email": editInfo.Email,
				"FirstName": editInfo.FirstName,
				"Name": editInfo.Name,
				"Password": editInfo.Password,
				}
			}).then(function(result) {console.log(result)},
			function(error) {console.log(error)});
	}
}]);