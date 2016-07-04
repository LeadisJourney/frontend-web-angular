'use strict';

LeadisControllers.controller('homeController', ['$scope', '$http', function($scope, $http) {
	var editor = ace.edit("editor");
	editor.setTheme("ace/theme/idle_fingers");
	editor.getSession().setMode("ace/mode/c_cpp");
	editor.$blockScrolling = Infinity;

	$scope.message = "Exercices";
	$scope.inputs = "";
	$scope.changeExerciseButton = "Change";
	$scope.launchExerciseButton = "Compile and Execute";
	$scope.saveExerciseButton = "Save";
	$scope.loadExerciseButton = "Load";
	$scope.eraseExerciseButton = "Erase All";

	//TODO : bind data to user's database
	$scope.user = {};
	$scope.user.data = [];
	var nodata = "No data found to load";

	$scope.currentExercise = null;
	var exercises = $scope.exercises = [];

	var title1 = "Exercice 1 : Les variables";
	var title2 = "Exercice 2 : Afficher des caractères à l'écran";
	var title3 = "Exercice 3 : Les tableaux";
	var title4 = "Exercice 4 : Les pointeurs";

	var results = "output";

	exercises.push({title: title1, value: 1, results: results});
	exercises.push({title: title2, value: 2, results: results});
	exercises.push({title: title3, value: 3, results: results});
	exercises.push({title: title4, value: 4, results: results});

	//Set active exercise
	$scope.showExercise = function(exercise) {
		$scope.currentExercise = exercise;
		editor.getSession().setValue("hello world !");
		editor.getSession().setValue("");
	};

	$scope.showPanelExercise = function() {
		$scope.currentExercise = null;
	};

	//Send a request to API with the user's input to compile it
	$scope.launchExercise = function() {
		var code = editor.getSession().getValue();
		console.log(code);
		$http.post("http://api-leadisjourney.azurewebsites.net/v0.1/api/...",
			{code: code}).then(function(result) {console.log(result)}, function(error) {console.log(error)});
	}

	//Save inputs in user's data
	$scope.saveExercise = function() {
		$scope.user.data[$scope.currentExercise.value] = editor.getSession().getValue();//$scope.user.inputs[$scope.currentExercise.value];
	};

	//Load inputs from user's data
	$scope.loadExercise = function() {
		if ($scope.user.data[$scope.currentExercise.value] == null || $scope.user.data[$scope.currentExercise.value] == "")
			alert(nodata);
		editor.getSession().setValue($scope.user.data[$scope.currentExercise.value]);
		// $scope.user.inputs[$scope.currentExercise.value] = $scope.user.data[$scope.currentExercise.value];
	};

	//Erase inputs in user's data
	$scope.eraseExercise = function() {
		editor.getSession().setValue("");
		// $scope.user.inputs[$scope.currentExercise.value] = "";
	};
}]);