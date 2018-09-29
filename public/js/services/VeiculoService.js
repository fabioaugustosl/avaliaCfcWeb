
apoioApp.factory('veiculoService', function($http, $log){
	
	var urlPadrao = 'http://localhost:3000'; 
	//var urlPadrao = 'http://veiculo.virtz.com.br:3000';

	var urlVeiculo = urlPadrao+'/api/veiculo/v1/';
	


	var listarTodos= function(parametros, fcCallback){
		console.log('Entou no listar service Aluno ')
		var paramentro = "";
		if(parametros){
			paramentro = parametros;
		}

		console.log('url:: ',urlVeiculo+paramentro);
		$http.get(urlVeiculo+paramentro)
			.then(
				function(data){
					console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get veiculos');
				}
			);
	};



	var recuperarVeiculoPorId = function(id, fcCallback){
		$http.get(urlVeiculo+id)
			.then(
				function(data){
					console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log(data);
					console.log('erro get veiculo por id');
				}
			);
	};

	
	
	var salvar = function(veiculo, fcCallback, fcError){
		console.log("veiculo salvar: ", veiculo);

		if(veiculo._id){		
			$http.patch(urlVeiculo+veiculo._id, veiculo).
				then(
					function(status){
						fcCallback(data.data);
					},
					function(){
						fcError("Ocorreu um erro ao atualizar informações da veiculo.");
					}
				);	
		} else {
			$http.post(urlVeiculo, veiculo)
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



	var remover = function(idVeiculo, fcCallback){
		console.log(' remover service ', idVeiculo);
		$http.delete(urlVeiculo+idVeiculo)
			.then(
				function(status){
					console.log('call back service remover veiculo');
					fcCallback(idVeiculo);
				}
			);	
	};





	return {
		listar: listarTodos,
		recuperarVeiculoPorId : recuperarVeiculoPorId,
		salvar : salvar,
		remover : remover
	};


});
