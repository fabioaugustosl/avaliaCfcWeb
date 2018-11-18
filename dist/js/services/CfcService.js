
apoioApp.factory('cfcService', function($http, $log){
	
	//var urlPadrao = 'http://localhost:3000'; //'http://ec2-52-11-115-221.us-west-2.compute.amazonaws.com:81'
	var urlPadrao = 'http://cfc.virtz.com.br:3000';

	var urlCfc = urlPadrao+'/api/cfc/v1/';
	var urlCfcAutenticacao = urlPadrao+'/api/cfcAutenticacao/v1/';
	


	var listarTodos = function(fcCallback){

		$http.get(urlCfc)
			.then(
				function(data){
					//console.log(data);

					fcCallback(data.data);
				},
				function(data){
					console.log('erro get cfcssss');
				}
			);

	};


	var recuperarCfcPorId = function(id, fcCallback){

		$http.get(urlCfc+id)
			.then(
				function(data){
					//console.log(data);

					fcCallback(data.data);
				},
				function(data){
					console.log(data);
					console.log('erro get cfc por id');
				}
			);

	};

	
	var autenticar = function(pEmail, pSenha, fcCallback, fcError){

 		var parametros = {
                email: pEmail,
                senha: pSenha
            };

		$http.post(urlCfcAutenticacao, parametros)
				.then(
					function(data, status, headers, config){
						console.log('chegou cb no sucesso autenticar',data);
						fcCallback(data.data);
					},
					function(data, status, headers, config){
						console.log('chegou no cb erro autenticar',data);
						fcError(data.data);
					}
				);	
	};



	var salvarCfc = function(cfc, fcCallback, fcError){
		console.log("cfc salvar: ", cfc);

		if(cfc._id){		
			$http.patch(urlCfc+cfc._id, cfc).
				then(
					function(status){
						fcCallback(data.data);
					},
					function(){
						fcError("Ocorreu um erro ao atualizar informações da CFC.");
					}
				);	
		} else {
			$http.post(urlCfc, cfc)
				.then(
					function(data, status, headers, config){
						fcCallback(data.data);
					},
					function(data, status, headers, config){
						console.log(data);
						fcError(data.data);
					}
				);
		}
	};




	return {
		listarTodos: listarTodos,
		recuperarCfcPorId : recuperarCfcPorId,
		autenticar : autenticar,
		salvar : salvarCfc
	};


});
