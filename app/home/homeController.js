'use strict';

LeadisControllers.controller('homeController', ['$scope', '$http', '$localStorage', function($scope, $http, $localStorage) {
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
	$scope.user.details = $localStorage.user;
	$scope.user.token = $localStorage.token;
	$scope.user.data = [];
	var nodata = "No data found to load";

	$scope.currentExercise = null;
	var exercises = $scope.exercises = [];

	var title1 = "Exercice 1 : la_meilleure";
	var title2 = "Exercice 2 : les_meilleures";
	var title3 = "Exercice 3 : la_sortie";

	var exo1 = "int la_meilleure(int a, int b, int c) {\n\t/* A supprimer */ \n\treturn (a > b) ? (a > c ? c : a) : (b > c ? b : c);\n\t/* A supprimer */\n}";
	var exo2 = "les_meilleures(int resultats[2], int a, int b, int c) { /*your code here*/ }";
	var exo3 = "typedef struct { int x; int y; } position;\ntypedef enum { SOL = 0, MUR = 1, ARRIVEE = 2 } type;\nvoid\tdeplacement_haut();\nvoid\tdeplacement_bas();\nvoid\tdeplacement_gauche();\nvoid\tdeplacement_droite();\n/* Exemple : 0 : vide 1 : mur 2 : arrivee 1 1 1 1 1 1 1 1 1 1 1 0 0 0 2 0 0 0 0 1 1 0 0 0 0 0 0 0 0 1 1 0 1 1 1 1 1 0 0 1 1 0 0 0 1 0 0 0 0 1 1 0 0 0 1 0 0 0 0 1 1 1 1 0 1 0 1 1 1 1 1 0 0 0 1 0 0 0 0 1 1 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 */\n/* A supprimer */\n#include <stdlib.h>\n#include <time.h>\n/* A supprimer */\nvoid\tla_sortie(type const labyrinthe[10][10], position const *leadis) \n{\n\t/* A supprimer */ srand(time(NULL)); (void)labyrinthe; (void)leadis; if (rand() % 2) deplacement_gauche(); else deplacement_droite();deplacement_haut();deplacement_haut();deplacement_haut();deplacement_gauche();deplacement_gauche();deplacement_haut();deplacement_haut();deplacement_haut();deplacement_droite();deplacement_droite();deplacement_droite();deplacement_haut();/* A supprimer */\n}";

	var results = "";

	exercises.push({title: title1, value: 1, results: results, exo: exo1});
	exercises.push({title: title2, value: 2, results: results, exo: exo2});
	exercises.push({title: title3, value: 3, results: results, exo: exo3});

	//Set active exercise
	$scope.showExercise = function(exercise) {
		$scope.currentExercise = exercise;
		editor.getSession().setValue("");
		editor.getSession().setValue(exercise.exo);
	};

	$scope.showPanelExercise = function() {
		$scope.currentExercise = null;
	};

	//Send a request to API with the user's input to compile it
	$scope.launchExercise = function() {
		var code = editor.getSession().getValue();
		console.log(code);
		var header = 'Bearer '+ $localStorage.token;
		console.log(header);
		$http.post("http://api-leadisjourney.azurewebsites.net/v0.1/api/userexperience", {
				"RequestId" : "14",
				"Language" : "C",
				"Code": code,
				"Type" : "Compilation",
				"Exercise" : "la_meilleure"
			}, {headers: {'Authorization' : header}}).then(function(result) {
				console.log(result)
				$scope.currentExercise.results = result.data.result;
				// if (result.data.result == "Bravo !") {
				// 	launchAnimation(JSONGameRun);
				// }
			},
			function(error) {console.log("Error : "); console.log(error)});
	};

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