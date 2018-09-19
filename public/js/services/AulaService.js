
apoioApp.factory('aulaService', function($http, $log){
	
	//var urlPadrao = 'http://localhost:3000'; //'http://ec2-52-11-115-221.us-west-2.compute.amazonaws.com:81'
	var urlPadrao = 'http://cfc.virtz.com.br:3000';

	var urlAula = urlPadrao+'/api/aula/v1/';
	


	
	var listar = function(parametros, fcCallback){
		console.log('Entou no listar service aula ')
		var paramentro = "";
		if(parametros){
			paramentro = parametros;
		}

		console.log('url:: ',urlAula+paramentro);
		$http.get(urlAula+paramentro)
			.then(
				function(data){
					console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get aulas');
				}
			);
	};


	var recuperarPorId = function(id, fcCallback){

		$http.get(urlAula+id)
			.then(
				function(data){
					console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log(data);
					console.log('erro get aula por id');
				}
			);
	};




	return {
		listar: listar,
		recuperarPorId : recuperarPorId
	};


});
