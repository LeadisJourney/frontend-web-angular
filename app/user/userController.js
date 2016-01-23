'use strict';

LeadisControllers.controller('userController', ['$scope', function ($scope) {
	$scope.message = "user";
	$scope.register = "register";
	$scope.login = "login";
	$scope.edit = "edit account infos";
	$scope.user = null;

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
		$http.post('/api/account', newUser);
	};

	$scope.login_user = function()
	{
		if (loginInfo.Pseudo && loginInfo.Password)
			alert(alertMessage);
//		$http.get('/api/account', loginInfo);
	};

	$scope.edit_user_info = function()
	{
		//TODO
	}
}]);