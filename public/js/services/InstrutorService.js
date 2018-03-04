
apoioApp.factory('instrutorService', function($http, $log){
	
	var urlPadrao = 'http://localhost:3000'; //'http://ec2-52-11-115-221.us-west-2.compute.amazonaws.com:81'
	//var urlPadrao = 'http://ec2-35-160-247-116.us-west-2.compute.amazonaws.com:84';

	var urlInstrutor = urlPadrao+'/api/avaliador/v1/';
	


	
	var listar = function(parametros, fcCallback){
		console.log('Entou no listar service PA ')
		var paramentro = "";
		if(parametros){
			paramentro = parametros;
		}

		console.log('url:: ',urlInstrutor+paramentro);
		$http.get(urlInstrutor+paramentro)
			.then(
				function(data){
					console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get instrutors');
				}
			);
	};


	var recuperarPorId = function(id, fcCallback){

		$http.get(urlInstrutor+id)
			.then(
				function(data){
					console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log(data);
					console.log('erro get isntrutor por id');
				}
			);
	};




	var salvar = function(instrutor, fcCallback, fcError){
		console.log("instrutor novo: ", instrutor);
	
		$http.post(urlInstrutor, instrutor)
			.then(
				function(data, status, headers, config){
					fcCallback(data.data);
				},
				function(data, status, headers, config){
					console.log(data);
					fcError(data.data);
				}
			);	
	};


	var remover = function(idInstrutor, fcCallback){
		console.log('categoria remover service ', idInstrutor);
		console.log(urlInstrutor+idInstrutor);
		$http.delete(urlInstrutor+idInstrutor)
			.then(
				function(status){
					console.log('call back service remover instrutor');
					fcCallback(idInstrutor);
				}
			);	
			
	};



	return {
		listar: listar,
		recuperarPorId : recuperarPorId,
		remover : remover,
		salvar : salvar
	};


});
