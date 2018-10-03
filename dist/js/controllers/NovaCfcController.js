
apoioApp.controller('NovaCfcController', 
	function ($scope, $rootScope, $routeParams, $sessionStorage, $location, $timeout, cfcService){
		
		console.log("chegou no controller de cadastrar Cfc");
		var cfcCtrl = this;

		$scope.$emit("tituloPagina", "Cadastrar CFC");

		cfcCtrl.processando = false;

		cfcCtrl.cfc = {};

		cfcCtrl.msg = null;
		cfcCtrl.msgErro = null;
		cfcCtrl.msgAlternativa = null;
		cfcCtrl.ocultarForm= null;


		var notificarErro = function(msg){
			//notify({ message: msg, classes: 'alert-danger', position: 'right', duration: 3000 });
		};

		var notificarSucesso = function(msg){
			//notify({ message: msg,  classes: 'alert-success', position: 'right', duration: 3000 });
		};
		
		
		var novaCfc = function(){
			
			cfcCtrl.cfc = {};
			
			/*
			id : {type : Number },
			nome : {type : String},
			email : {type : String},
			senha : {type : String},
			telefone : {type : String},
			endereco : {type : String},
			cidade : {type : String},
			estado : {type : String},
			*/

		};


		var redirecionarLogado = function(){
			$timeout(function(){
				$location.replace();
				$location.url('/dashboard');
			}, 5000);
		};

	        	
		var callbackSalvar = function(resultado){
			console.log("call back salvar", resultado);

			cfcCtrl.processando  = false;
			cfcCtrl.msg = "CFC foi cadastrada com sucesso!";
			cfcCtrl.msgErro = '';

			notificarSucesso(cfcCtrl.msg);

			$scope.$emit("usuarioLogado", resultado);

			$sessionStorage.usuarioLogado = resultado;
			cfcCtrl.ocultarForm = "SIM";

			cfcCtrl.msgAlternativa = "Você será redirecionado em 5 segundos para a página de adminstração de sua CFC.";
			redirecionarLogado();
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

		novaCfc();

	}
	
);