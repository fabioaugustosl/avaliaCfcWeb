
 

apoioApp.controller('MenuController',
	function ($scope, $rootScope, $routeParams, $location, $sessionStorage){
		
		


	  	console.log("menu  Controller");

		
		$scope.irParaNovaCfc = function(){
			console.log("go to nova cfc");
			$location.replace();
			$location.url('/novaCfc');
		};

		$scope.irParaApoio = function(){
			$location.replace();
			$location.url('/categoria');
		};

		$scope.irParaCategoria = function(){
			$location.replace();
			$location.url('/categoria');
		};
		
		$scope.irParaPa = function(){
			$location.replace();
			$location.url('/pa');
		};

		$scope.irParaSenha = function(){
			$location.replace();
			$location.url('/senha');
		};

		$scope.irParaAtender = function(){
			$location.replace();
			$location.url('/atender');
		};

		$scope.irParaPainel = function(){
			$location.replace();
			$location.url('/painel');
		};
		
	}
);

