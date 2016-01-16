'use strict';

LeadisControllers.controller('homeController', ['$scope', function ($scope) {
	$scope.message = "Exercices";
	$scope.results = "output";
	$scope.inputs = "";
	$scope.changeExerciseButton = "Change";

	$scope.currentExercise = null;
	var exercises = $scope.exercises = [];

	var title1 = "Exercice 1 : Les variables";
	var title2 = "Exercice 2 : Afficher des caractères à l'écran";
	var title3 = "Exercice 3 : Les tableaux";
	var title4 = "Exercice 4 : Les pointeurs";

	exercises.push({title: title1, value: 1});
	exercises.push({title: title2, value: 2});
	exercises.push({title: title3, value: 3});
	exercises.push({title: title4, value: 4});

	//Set active exercise
	$scope.showExercise = function(exercise) {
		$scope.currentExercise = exercise;
	};
	$scope.showPanelExercise = function(){
		$scope.currentExercise = null;
	}
}]);