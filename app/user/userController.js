'use strict';

LeadisControllers.controller('userController', ['$scope', '$http', function($scope, $http) {
	$scope.message = "user";
	$scope.register = "register";
	$scope.login = "login";
	$scope.edit = "edit account infos";
	$scope.user = null;
	$scope.details = "vide";

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
			url: 'http://163.5.84.111:2222/v0.1/api/account',
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

	$scope.login_user = function(nb)
	{
		$http({
			method: 'GET',
			url: 'http://163.5.84.111:2222/v0.1/api/account/'+nb
		}).then(function successCallback(response) {
        	$scope.details = response.data;
        }, function errorCallback(response) {
			alert("Error: " + response.statusText);
		});
	};

	$scope.edit_user_info = function()
	{	}
}]);