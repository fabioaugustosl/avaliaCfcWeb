
apoioApp.factory('alunoService', function($http, $log){
	
	//var urlPadrao = 'http://localhost:3000'; //'http://ec2-52-11-115-221.us-west-2.compute.amazonaws.com:81'
	var urlPadrao = 'http://cfc.virtz.com.br:3000';

	var urlAluno = urlPadrao+'/api/aluno/v1/';
	


	
	var listar = function(parametros, fcCallback){
		console.log('Entou no listar service Aluno ')
		var paramentro = "";
		if(parametros){
			paramentro = parametros;
		}

		//console.log('url:: ',urlAluno+paramentro);
		$http.get(urlAluno+paramentro)
			.then(
				function(data){
					//console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get alunos');
				}
			);
	};


	var recuperarPorId = function(id, fcCallback){

		$http.get(urlAluno+id)
			.then(
				function(data){
					//console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log(data);
					console.log('erro get aluno por id');
				}
			);
	};


	var salvar = function(aluno, fcCallback, fcError){
		console.log("aluno novo: ", aluno);
	
		$http.post(urlAluno, aluno)
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


	var remover = function(idaluno, fcCallback){
		console.log('aluno remover service ', idaluno);
		console.log(urlAluno+idaluno);
		$http.delete(urlAluno+idaluno)
			.then(
				function(status){
					console.log('call back service remover aluno');
					fcCallback(idaluno);
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
