
apoioApp.factory('simuladoService', function($http, $log){
	
	//var urlPadrao = 'http://localhost:3000';
	var urlPadrao = 'http://cfc.virtz.com.br:3000';

	var urlSimulado = urlPadrao+'/api/simulado/v1/';
	

	var listarTodosPorAluno = function(aluno, fcCallback){
		
		$http.get(urlSimulado+"?aluno="+aluno)
			.then(
				function(data){
					console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get listarTodosPorAluno');
				}
			);
	};

	

	return {
		listarTodosPorAluno : listarTodosPorAluno
	};


});
