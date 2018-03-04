

apoioApp.controller('DashboardController',
	function ($scope, $rootScope, $http, $log){
		var dashboardCtrl = this;
		console.log("Dashboard Controller");

		
		$scope.$emit("tituloPagina", "Dashboard");



	}
);
