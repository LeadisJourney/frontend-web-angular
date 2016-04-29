'use strict';

LeadisControllers.controller('userController', ['$scope', '$http', function($scope, $http) {
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
//	Get account by Id
//	{
//	  "Email": "user@example.com",
//	  "Name": "Smith",
//	  "FirstName": "John",
//	  "Pseudo": "Utilisateur"
//	}
	$scope.login_user = function()
	{
		if (!(loginInfo.Pseudo && loginInfo.Password))
			alert(alertMessage);
		$http.get('163.5.84.111/v0.1/api/account/:id', loginInfo).then(function(response) {
          $scope.details = response.data;
        });
	};

	$scope.edit_user_info = function()
	{	}
}]);

/*GuessController.controller('basicController', ['$scope', '$http', function($scope, $http) {
    var message = $scope.message = "Welcome !";
    var inputs = $scope.inputs = "";
    var instanceId = 0;

    $scope.CheckAnswer = function(input){
        $http({
            method: 'GET',
            url: 'http://localhost:8181/api/game/player/answers/' + input,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        .then(function successCallback(response) {
            if (response.status == 200) {
                if (instanceId != response.data.instanceID)
                {
                    alert("The game has been updated !");
                    instanceId = response.data.instanceID;
                }
                if (response.data.result == true)
                    $scope.message = "GG !";
                else
                    $scope.message = "You lost this time, try again dude :3";
            }
        }, function errorCallback(response) {
            alert("errorCallback");
        });
    }
}]);*/