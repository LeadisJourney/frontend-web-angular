'use strict';

LeadisControllers.controller('contactController', ['$scope',
	function ($scope) {
		$scope.contactTitle = "Le projet";

		var mainText = $scope.mainText = [];
		
		var paragrapher1 = "Leadis Journey est une application web et mobile ayant pour but de faire découvrir la programmation C/C++ à un public collégien.";
		var	paragrapher2 = "Pour ce faire, l’apprentissage se fera au travers de mini jeux mettant en scène un robot découvrant une nouvelle planète. Un éditeur de code ainsi qu’un tutoriel sera fourni à l’étudiant pour répondre à la consigne de l’exercice.";
		var	paragrapher3 = "Le rendu graphique du jeu faisant office de débugger en plus de servir de motivation pour l’utilisateur.";
		mainText.push({ paragrapher: paragrapher1 });
		mainText.push({ paragrapher: paragrapher2 });
		mainText.push({ paragrapher: paragrapher3 });
}]);