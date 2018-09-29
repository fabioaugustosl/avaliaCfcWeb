
apoioApp.controller('CfcController', 
	function ($scope, $rootScope, $routeParams, $sessionStorage, $location, notify, cfcService){
		
		console.log("chegou no controller de Cfc");
		var cfcCtrl = this;

		$scope.$emit("tituloPagina", "Minha Conta");

		cfcCtrl.processando = false;

		cfcCtrl.cfc = $sessionStorage.usuarioLogado;
		cfcCtrl.categorias = ['A', 'B', 'C', 'D', 'E'];

		cfcCtrl.msg = null;
		cfcCtrl.msgErro = null;

		//variaveis de controle de tela de novo exercicio
		cfcCtrl.modoInserirExercicio = false;
		cfcCtrl.exercicioNovo = {};

		//variaveis de controle de tela de nova falta
		cfcCtrl.modoInserirFalta = false;
		cfcCtrl.faltaNovo = {};


		var notificarErro = function(msg){
			notify({ message: msg, classes: 'alert-danger', position: 'right', duration: 3000 });
		};

		var notificarSucesso = function(msg){
			notify({ message: msg,  classes: 'alert-success', position: 'right', duration: 3000 });
		};
		

	        	
		var callbackSalvar = function(resultado){
			console.log("call back salvar", resultado);

			cfcCtrl.processando  = false;
			cfcCtrl.msg = "CFC foi cadastrada com sucesso!";
			cfcCtrl.msgErro = '';

			notificarSucesso(cfcCtrl.msg);

			$scope.$emit("usuarioLogado", resultado);

			$sessionStorage.usuarioLogado = resultado;
		};

		var callbackSalvarErro= function(resultado){
			cfcCtrl.processando  = false;
			cfcCtrl.msg = "";
			cfcCtrl.msgErro = 'Ocorreu um erro ao cadastrar sua Cfc.';
			notificarErro(cfcCtrl.msgErro);
			//cfcCtrl.msgAlternativa = resultado.msgErro;
		};


		cfcCtrl.salvar = function(){
			cfcCtrl.processando = true;	
			
			console.log(cfcCtrl.cfc);

			cfcService.salvar(cfcCtrl.cfc, callbackSalvar, callbackSalvarErro);		
		};


		//EXCLUSÔES
		cfcCtrl.removerExercicio =function(exerc){
			var indexOfItem = cfcCtrl.cfc.exercicios.indexOf(exerc);
	        cfcCtrl.cfc.exercicios.splice(indexOfItem, 1);
		};

		cfcCtrl.removerFalta =function(falta){
			var indexOfItem = cfcCtrl.cfc.faltas.indexOf(falta);
	        cfcCtrl.cfc.faltas.splice(indexOfItem, 1);
		};


		//ADD E SALVAR EXERCICIO
		cfcCtrl.adicionarExercicio = function(){	
 			cfcCtrl.exercicioNovo = {};
 			cfcCtrl.modoInserirExercicio = true;
		};

		cfcCtrl.salvarExercicio = function(){
 			if(cfcCtrl.exercicioNovo.nome && cfcCtrl.exercicioNovo.categoria){
 				cfcCtrl.cfc.exercicios.push(cfcCtrl.exercicioNovo);	
 				cfcCtrl.exercicioNovo = {};
 				cfcCtrl.modoInserirExercicio = false;
 			}
 			
		};

		cfcCtrl.cancelarExercicio = function(){
			cfcCtrl.exercicioNovo = {};
			cfcCtrl.modoInserirExercicio = false;
		};


		// ADD E SALVAR FALTA
		cfcCtrl.adicionarFalta = function(){	
 			cfcCtrl.faltaNovo = {};
 			cfcCtrl.modoInserirFalta = true;
		};

		cfcCtrl.salvarFalta = function(){
			console.log('cfcCtrl.faltaNovo : ',cfcCtrl.faltaNovo);
 			if(cfcCtrl.faltaNovo.nome && cfcCtrl.faltaNovo.categoria){
 				cfcCtrl.cfc.faltas.push(cfcCtrl.faltaNovo);	
 				cfcCtrl.faltaNovo = {};
 				cfcCtrl.modoInserirFalta = false;
 			}
 			
		};

		cfcCtrl.cancelarFalta = function(){
			cfcCtrl.faltaNovo = {};
			cfcCtrl.modoInserirFalta = false;
		};
	}
	
);