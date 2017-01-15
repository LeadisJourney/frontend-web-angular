'use strict';

LeadisControllers.controller('userController', ['$scope', '$http', '$localStorage', function($scope, $http, $localStorage) {
	$scope.message = "user";
	$scope.login = "login";
	$scope.register = "register";
	$scope.edit = "edit account infos";
	$scope.details = "vide";
	$scope.user = $localStorage.user;

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
			url: 'http://'+$localStorage.requestURL+'/v0.1/api/account',
			data: {
			 			"Pseudo" : newUser.Pseudo,
			 			"Password" : newUser.Password,
			 			"Email" : newUser.Email,
			 			"Name" : newUser.Name,
			 			"FirstName" : newUser.FirstName
			 		}
			}).then(function(result) {
				console.log(result)
				alert("SUCCESS, you can now login");
			},
			function(error) {
				console.log(error)
				alert("fail ", +error);
			});
	};

	$scope.login_user = function()
	{
		$http.post('http://'+$localStorage.requestURL+'/v0.1/api/account/login', {
			"Email" : loginInfo.Email,
			"Password" : loginInfo.Password
		}).then(function(result) {
			console.log("user successfully login : ")
			console.log(result)
			$localStorage.user = {
				"Email" : loginInfo.Email,
				"Password" : loginInfo.Password,
				"Id" : result.data.id
			};
			$localStorage.user.Id = result.data.id;
			$localStorage.token = result.data.token;
			$scope.user = $localStorage.user;
			console.log("data got : "+result.data);
			console.log("token got : "+$localStorage.token);
		}, function(error) {console.log(error)});
	};

	$scope.logout_user = function()
	{
		$localStorage.user = null;
		$localStorage.token = null;
		$scope.user = null;
	};

	$scope.infos_user = function()
	{
		$http({
			method: 'GET',
			url: 'http://'+$localStorage.requestURL+'/v0.1/api/account/'+ $localStorage.user.Id
		}).then(function (result) {
			console.log("user infos successfully got : ")
			console.log(result)
			$localStorage.user.Email = result.data.email;
			$localStorage.user.Name = result.data.name;
			$localStorage.user.FirstName = result.data.firstName;
			$localStorage.user.Pseudo = result.data.pseudo;
		}, function(error) {console.log(error)});
	};

	$scope.edit_user_info = function()
	{
		console.log('http://'+$localStorage.requestURL+'/v0.1/api/account/'+ $localStorage.user.Id);
		var header = 'Bearer '+ $localStorage.token;
		$http.put("http://"+$localStorage.requestURL+"/v0.1/api/account/"+ $localStorage.user.Id, {
				"Email": $localStorage.user.Email,
				"FirstName": $localStorage.user.FirstName,
				"Name": $localStorage.user.Name,
				"Password": $localStorage.user.Password,
			},
			{headers: {'Authorization' : header}})
		.then(
			function(result) {
				alert("Your informations have been successfully modified !");
				console.log("Your informations have been successfully modified !")
				console.log(result)
			},
			function(error) {console.log("Error : "); console.log(error)});
	};
}]);