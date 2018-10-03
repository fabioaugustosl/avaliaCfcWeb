
apoioApp.factory('dashboardCfcService', function($http, $log){
	
	var urlPadrao = 'http://localhost:3000'; 
	//var urlPadrao = 'http://cfc.virtz.com.br:3000';

	var urlDashCfc = urlPadrao+'/api/dashCfc/v1/';
	

	var listarAulasDoDiaPorInstrutor = function(cfc,  fcCallback){
		$http.get(urlDashCfc+"listarAulasDoDiaPorInstrutor/"+cfc)
			.then(
				function(data){
					//console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get listarAulasDoDiaPorInstrutor');
				}
			);
	};


	var listarKmDoDiaPorInstrutor = function(cfc,  fcCallback){
		$http.get(urlDashCfc+"listarKmDoDiaPorInstrutor/"+cfc)
			.then(
				function(data){
					//console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get listarKmDoDiaPorInstrutor');
				}
			);
	};


	var listarAulasAtivas = function(cfc, fcCallback){
		$http.get(urlDashCfc+"listarAulasAtivas/"+cfc)
			.then(
				function(data){
					//console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get listarAulasAtivas');
				}
			);
	};

	

	return {
		listarAulasDoDiaPorInstrutor :listarAulasDoDiaPorInstrutor,
		listarKmDoDiaPorInstrutor : listarKmDoDiaPorInstrutor,
		listarAulasAtivas : listarAulasAtivas
	};


});
