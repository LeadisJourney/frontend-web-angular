'use strict';

LeadisControllers.controller('lessonsController', ['$scope', '$localStorage', function ($scope, $localStorage) {
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
}]);