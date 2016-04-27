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
		$http.post('163.5.84.111/v0.1/api/account', newUser).success(function(data) {
			if (data.success)
				alert("success");
			else
				alert("fail");
		}).error(function() {
		    alert("An error occured");
		});
	};

	/**
	Get account by Id
	{
	  "Email": "user@example.com",
	  "Name": "Smith",
	  "FirstName": "John",
	  "Pseudo": "Utilisateur"
	}
	**/
	$scope.login_user = function()
	{
		if (!(loginInfo.Pseudo && loginInfo.Password))
			alert(alertMessage);
		$http.get('163.5.84.111/v0.1/api/account/:id', loginInfo).then(function(response) {
          $scope.details = response.data;
        });
	};

	$scope.edit_user_info = function()
	{
		//TODO
	}
}]);