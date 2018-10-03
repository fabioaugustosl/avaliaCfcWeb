
apoioApp.controller('ContatoController',
	function ($scope, $rootScope, $routeParams, $location, $sessionStorage){

		var contatoCtrl = this;

		contatoCtrl.msg = null;
		contatoCtrl.msgErro = null;

		var iniciar = function(){
			contatoCtrl.nome = null;
			contatoCtrl.email = null;
			contatoCtrl.telefone = null;
			contatoCtrl.mensagem = null;

		};
		


		contatoCtrl.enviar = function(i){
			contatoCtrl.msg = "Mensagem enviada com sucesso!";
			iniciar();	
		};



		iniciar();

	}
);

