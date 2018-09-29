
apoioApp.controller('AlunoController', 
	function ($scope, $rootScope, $routeParams,$location, $sessionStorage, notify, alunoService){
		
		console.log("chegou no controller de aluno");
		var alunoCtrl = this;

		$scope.$emit("tituloPagina", "Cadastro de alunos");


		alunoCtrl.processando = false;
		alunoCtrl.modoEdicao = false;

		alunoCtrl.alunos = [];
		alunoCtrl.aluno = {};
		alunoCtrl.alunoSelecionado;
		alunoCtrl.cfc = $sessionStorage.usuarioLogado;

		alunoCtrl.categorias = ['A', 'B', 'C', 'D', 'E'];

		alunoCtrl.msg = null;
		alunoCtrl.msgErro = null;


		var notificarErro = function(msg){
			notify({ message: msg, 
					classes: 'alert-danger', position: 'right', duration: 3000 });
		};

		var notificarSucesso = function(msg){
			notify({ message: msg, 
					classes: 'alert-success', position: 'right', duration: 3000 });
		};
		
	

		var novoaluno = function(){
			alunoCtrl.aluno = {};
			console.log('cfc selecionado : ',alunoCtrl.cfc);
			alunoCtrl.aluno.cfc = alunoCtrl.cfc._id;
			alunoCtrl.aluno.categoria = 'B';
		};
		
		alunoCtrl.editar = function(a){
			console.log('editar ', a);
			alunoCtrl.modoEdicao = true;
			alunoCtrl.aluno = a;
		};

		alunoCtrl.cancelarEditar = function(){
			alunoCtrl.modoEdicao = false;
			alunoCtrl.aluno = {};
			notificarSucesso("Edição cancelada!");
		};

		
		var callbackRemover = function(){
			console.log("callback remover aluno ", alunoCtrl.alunoSelecionado);
			
			var indexOfItem = alunoCtrl.alunos.indexOf(alunoCtrl.alunoSelecionado);
	        alunoCtrl.alunos.splice(indexOfItem, 1);
	        
			alunoCtrl.processando  = false;
			alunoCtrl.msg = "aluno foi removido com sucesso";
			alunoCtrl.msgErro = '';
			notificarSucesso(alunoCtrl.msg);
			alunoCtrl.alunoSelecionado = null;
		};

		var callbackRemoverErro= function(resultado){
			alunoCtrl.processando  = false;
			alunoCtrl.msg = "";
			alunoCtrl.msgErro = 'Ocorreu um erro ao remover o aluno';

			notificarErro(alunoCtrl.msgErro);
			alunoCtrl.alunoSelecionado = null;
		};

		alunoCtrl.remover = function(i){
			console.log('remover ', i);

			alunoCtrl.processando = true;
			alunoCtrl.alunoSelecionado = i;
			alunoService.remover(i._id, callbackRemover, callbackRemoverErro);		
		};

		alunoCtrl.verDesempenho = function(i){
			console.log('verDesempenho ', i);

			$location.replace();
			console.log('link chamado '+'/dashboardAluno/'+i._id);
			$location.url('/dashboardAluno/'+i._id);
		};
	        	
		var callbackSalvar = function(resultado){
			console.log("call back salvar", resultado);

			alunoCtrl.processando  = false;
			alunoCtrl.msg = "Aluno foi salvo com sucesso. Código de acesso gerado: "+resultado.login;
			alunoCtrl.msgErro = '';
			alunoCtrl.alunos.push(resultado);

			notificarSucesso(alunoCtrl.msg);

			novoaluno();
		};

		var callbackSalvarErro= function(resultado){
			alunoCtrl.processando  = false;
			alunoCtrl.msg = "";
			alunoCtrl.msgErro = 'Ocorreu um erro ao salvar o aluno';
			notificarErro(alunoCtrl.msgErro);
		};

		alunoCtrl.salvar = function(){
			alunoCtrl.processando = true;	
			console.log(alunoCtrl.aluno);
			alunoService.salvar(alunoCtrl.aluno, callbackSalvar, callbackSalvarErro);		
		};



		var callbackListar = function(resultado){
			console.log("call back listar", resultado);
			alunoCtrl.alunos = resultado;
			alunoCtrl.processando  = false;
		};
		
		alunoCtrl.getAlunos = function(parametros){
			alunoCtrl.processando = true;
			alunoService.listar(parametros, callbackListar);		
		};




		alunoCtrl.pesquisar = function(){
			console.log('cfc logado ',alunoCtrl.cfc._id);
			var p = 'cfc='+alunoCtrl.cfc._id;
			if(alunoCtrl.pesquisa && alunoCtrl.pesquisa.nome){
				p += '&nome='+alunoCtrl.pesquisa.nome;
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
			alunoCtrl.getAlunos(p);
		};



		//INIT
		
		novoaluno();

		console.log('PROCESSANDO: ',alunoCtrl.processando);
		if(!alunoCtrl.processando){
			//paCtrl.getEmpresas();
			alunoCtrl.pesquisar();
		}

	}
	
);