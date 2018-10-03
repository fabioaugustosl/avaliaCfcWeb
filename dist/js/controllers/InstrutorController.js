
apoioApp.controller('InstrutorController', 
	function ($scope, $rootScope, $routeParams, $sessionStorage, notify, instrutorService){
		
		console.log("chegou no controller de instrutor");
		var instrutorCtrl = this;

		$scope.$emit("tituloPagina", "Atendimento");


		instrutorCtrl.processando = false;
		instrutorCtrl.modoEdicao = false;

		instrutorCtrl.instrutores = [];
		instrutorCtrl.instrutor = {};
		instrutorCtrl.instrutorSelecionado;
		instrutorCtrl.cfc = $sessionStorage.usuarioLogado;

		instrutorCtrl.msg = null;
		instrutorCtrl.msgErro = null;


		var notificarErro = function(msg){
			notify({ message: msg, 
					classes: 'alert-danger', position: 'right', duration: 3000 });
		};

		var notificarSucesso = function(msg){
			notify({ message: msg, 
					classes: 'alert-success', position: 'right', duration: 3000 });
		};
		
	

		var novoInstrutor = function(){
			instrutorCtrl.instrutor = {};
			console.log('cfc selecionado : ',instrutorCtrl.cfc);
			instrutorCtrl.instrutor.cfc = instrutorCtrl.cfc._id;
		};


		instrutorCtrl.editar = function(instrutor){
			console.log('editar ', instrutor);
			instrutorCtrl.modoEdicao = true;
			instrutorCtrl.instrutor = instrutor;
		};

		instrutorCtrl.cancelarEditar = function(){
			instrutorCtrl.modoEdicao = false;
			instrutorCtrl.instrutor = {};
			notificarSucesso("Edição cancelada!");
		};

		

		var callbackRemover = function(){
			console.log("callback remover instrutor ", instrutorCtrl.instrutorSelecionado);
			
			var indexOfItem = instrutorCtrl.instrutores.indexOf(instrutorCtrl.instrutorSelecionado);
	        instrutorCtrl.instrutores.splice(indexOfItem, 1);
	        
			instrutorCtrl.processando  = false;
			instrutorCtrl.msg = "Instrutor foi removido com sucesso";
			instrutorCtrl.msgErro = '';
			notificarSucesso(instrutorCtrl.msg);
			instrutorCtrl.instrutorSelecionado = null;
		};

		var callbackRemoverErro= function(resultado){
			instrutorCtrl.processando  = false;
			instrutorCtrl.msg = "";
			instrutorCtrl.msgErro = 'Ocorreu um erro ao remover o instrutor';

			notificarErro(instrutorCtrl.msgErro);
			instrutorCtrl.instrutorSelecionado = null;
		};

		instrutorCtrl.remover = function(i){
			console.log('remover ', i);

			instrutorCtrl.processando = true;
			instrutorCtrl.instrutorSelecionado = i;
			instrutorService.remover(i._id, callbackRemover, callbackRemoverErro);		
		};


	        	
		var callbackSalvar = function(resultado){
			console.log("call back salvar", resultado);

			instrutorCtrl.processando  = false;
			instrutorCtrl.msg = "Instrutor foi salvo com sucesso";
			instrutorCtrl.msgErro = '';
			instrutorCtrl.instrutores.push(resultado);

			notificarSucesso(instrutorCtrl.msg);

			novoInstrutor();
		};

		var callbackSalvarErro= function(resultado){
			instrutorCtrl.processando  = false;
			instrutorCtrl.msg = "";
			instrutorCtrl.msgErro = 'Ocorreu um erro ao salvar o instrutor';
			notificarErro(instrutorCtrl.msgErro);
		};

		instrutorCtrl.salvar = function(){
			instrutorCtrl.processando = true;	
			console.log(instrutorCtrl.instrutor);
			instrutorService.salvar(instrutorCtrl.instrutor, callbackSalvar, callbackSalvarErro);		
		};



		var callbackListar = function(resultado){
			console.log("call back listar", resultado);
			instrutorCtrl.instrutores = resultado;
			instrutorCtrl.processando  = false;
		};
		
		instrutorCtrl.getInstrutores = function(parametros){
			instrutorCtrl.processando = true;
			instrutorService.listar(parametros, callbackListar);		
		};




		instrutorCtrl.pesquisar = function(){
			console.log('cfc logado ',instrutorCtrl.cfc._id);
			var p = 'cfc='+instrutorCtrl.cfc._id;
			if(instrutorCtrl.pesquisa && instrutorCtrl.pesquisa.nome){
				p += '&nome='+instrutorCtrl.pesquisa.nome;
			}
			// if(paCtrl.pesquisa.conta){
			// 	if(p){
			// 		p += '&';
			// 	}
			// 	p += 'info_extra3='+$scope.pesquisa.conta;
			// }

			if(p){
				p = '?'+p;
			}

			//console.log(p);
			instrutorCtrl.getInstrutores(p);
		};


		console.log('PROCESSANDO: ',instrutorCtrl.processando);
		if(!instrutorCtrl.processando){
			//paCtrl.getEmpresas();
			instrutorCtrl.pesquisar();
		}

		novoInstrutor();
		
		

	}
	
);