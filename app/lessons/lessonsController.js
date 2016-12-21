'use strict';

LeadisControllers.controller('lessonsController', ['$scope', '$http', '$localStorage', function ($scope, $http, $localStorage) {
	$scope.message = "welcome";

    // Defaults
    $scope.activeItem = null;

	var lessons = $scope.lessons = [];
	var title0 = "Bonjour Leadis";
	var title1 = "Leadis a la plage";
	var title2 = "Leadis contre-attaque";
	var description0 = "Nous sommes très heureux de vous compter parmi nous";
	var description1 = "Leadis a la plage trempe ses non-pieds.\nPour ce cours vous devrez utiliser une très belle technique de programmation appelée...";
	var description2 = "Leadis contre-attaque, faites attention";

	var leadisImagePath = "ressources/2017_logo_LeadisJourney.png";
	var videoPath = "ressources/video.mp4";

	lessons.push({ title: title0, description: description0, image: leadisImagePath, video: null });
	lessons.push({ title: title1, description: description1, image: null, video: null });
	lessons.push({ title: title2, description: null, image: null, video: videoPath });

	$scope.user = {};
	$scope.user.details = $localStorage.user;
	$scope.user.token = $localStorage.token;
	$scope.user.data = [];

    //Set active lesson or unset if already set
    $scope.showLesson = function(lesson) {
    	if ($scope.activeItem == lesson)
    	{
			$scope.activeItem = null;
    	}
    	else
    	{
	    	$scope.activeItem = lesson;
		}
	};

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
					lessons.push({ title: result.data[i].title, description: null, image: null, video: null });
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