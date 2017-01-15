'use strict';

LeadisControllers.controller('lessonsController', ['$scope', '$http', '$localStorage', function ($scope, $http, $localStorage) {
	$scope.message = "welcome";

    // Defaults
    $scope.activeItem = null;
	$scope.isShowGlossary = false;

	var lessons = $scope.lessons = [];
	var glossary = $scope.glossary = [];
	var title0 = "function";
	var title1 = "variable";
	var title2 = "loops";
	var description0 = "A function is a group of statements that together perform a task. Every C program has at least one function, which is main(), and all the most trivial programs can define additional functions.";
	var description1 = "A variable is a name given to a storage area that our programs can manipulate. Each variable in C has a specific type, which determines the size and layout of the variable's memory; the range of values that can be stored within that memory; and the set of operations that can be applied to the variable.";
	var description2 = "A loop statement allows us to execute a statement or group of statements multiple times.";

	glossary.push({ title: title0, description: description0});
	glossary.push({ title: title1, description: description1});
	glossary.push({ title: title2, description: description2});

	$scope.user = {};
	$scope.user.details = $localStorage.user;
	$scope.user.token = $localStorage.token;
	$scope.user.data = [];

    //Set active lesson or unset if already set
    $scope.showLesson = function(lesson) {
    	if ($scope.activeItem == lesson) {
			$scope.activeItem = null;
    	} else {
	    	$scope.activeItem = lesson;
		}
	};

	$scope.showGlossary = function() {
		if ($scope.isShowGlossary == true){
			$scope.isShowGlossary = false;
		} else {
			$scope.isShowGlossary = true;
		}
	}

	$scope.logout_user = function()
	{
		$localStorage.user = null;
		$localStorage.token = null;
		$scope.user = null;
	};

	var parseLessonRequest = function(data)
	{
		var result = [];
		for (var i = data.sources.length - 1; i >= 0; i--) {
			if (data.sources[i].type == "Text") {
				result.description = data.sources[i].content;
			}
			else if (data.sources[i].type == "Image") {
				result.image = data.sources[i].content;
			}
			else if (data.sources[i].type == "Video") {
				result.video = data.sources[i].content;
			}
		}
		result.title = data.title;
		return result;
	}

	var init = function()
	{
		$http({
			method: 'GET',
			url: 'http://'+$localStorage.requestURL+'/v0.1/api/tutorial/',
			headers: { 'Authorization': 'Bearer '+$localStorage.token }
		}).then(function (result) {
			console.log("tutorials successfully got : ")
			console.log(result)
			for (var i = 0; i < result.data.length; i++)
				{
					lessons.push(parseLessonRequest(result.data[i]));
				};
		}, function(error) {
			console.log(error);
			if (error.statusText == "Unauthorized")
			{
				alert("You must be logged in to view this content.");
			}
		});
	}

	init();
}]);