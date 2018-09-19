
apoioApp.factory('dashboardService', function($http, $log){
	
	//var urlPadrao = 'http://localhost:3000'; //'http://ec2-52-11-115-221.us-west-2.compute.amazonaws.com:81'
	var urlPadrao = 'http://cfc.virtz.com.br:3000';

	var urlDashAluno = urlPadrao+'/api/dashAluno/v1/';
	

	var listarMediaNotasPorExercicio = function(cfc, aluno, fcCallback){
		$http.get(urlDashAluno+"listarMediaNotasPorExercicio/"+cfc+"/"+aluno)
			.then(
				function(data){
					console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get listarMediaNotasPorExercicio');
				}
			);
	};


	var listarMediaNotasPorAula = function(cfc, aluno, fcCallback){
		$http.get(urlDashAluno+"listarMediaNotasPorAula/"+cfc+"/"+aluno)
			.then(
				function(data){
					console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get listarMediaNotasPorAula');
				}
			);
	};

	

	return {
		listarMediaNotasPorExercicio :listarMediaNotasPorExercicio,
		listarMediaNotasPorAula : listarMediaNotasPorAula
	};


});
