'use strict';

LeadisControllers.controller('userController', ['$scope', '$http', function($scope, $http) {
	$scope.message = "user";
	$scope.register = "register";
	$scope.login = "login";
	$scope.edit = "edit account infos";
	$scope.user = null;
	$scope.details = "vide";
	$scope.nbvar = 1;
	$scope.usertoken = "token";

	var alertMessage = "please fill in the form correctly.";

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

	var newLogin = $scope.newLogin = {
										"Email": null,
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

		$scope.login = "json=" + encodeURI(JSON.stringify([newUser]));
		$http({
			method: 'POST',
			url: 'http://api-leadisjourney.azurewebsites.net/v0.1/api/account',
			dataType:'jsonp',
			data: {
			 			"Pseudo" : newUser.Pseudo,
			 			"Password" : newUser.Password,
			 			"Email" : newUser.Email,
			 			"Name" : newUser.Name,
			 			"FirstName" : newUser.FirstName
			 		}
			}).then(function successCallback(response) {
				alert("success");
	       		$scope.details = response.data;
			}, function errorCallback(response) {
				alert("Error: " + response.statusText + response.Message);
			});
	};

	$scope.login_user = function()
	{
		// use $.param jQuery function to serialize data from JSON 
		// var data = $.param({
		// 	Email: newLogin.Email,
		// 	Password: newLogin.Password
		// });
		// var config = {
		// 	headers : {
		// 		'Content-Type': 'application/json'
		// 	}
		// }

		// $http.post('http://api-leadisjourney.azurewebsites.net/v0.1/api/account/login', data, config)
		// .then(function successCallback(response) {
		// 	$scope.usertoken = response.Token;
		// }, function errorCallback(response) {
		// 	alert("Error: " + response.statusText + response.Message);
		// });

//

		$http({
			method: 'POST',
			url: 'http://api-leadisjourney.azurewebsites.net/v0.1/api/account/login',
			dataType:'jsonp',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
			 			"Email" : newLogin.Email,
			 			"Password" : newLogin.Password
					}
		})
		.then(function successCallback(response) {
			$scope.usertoken = response.Token;
		}, function errorCallback(response) {
			alert("Error: " + response.statusText + response.Message);
		});
	};

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
	{	}
}]);