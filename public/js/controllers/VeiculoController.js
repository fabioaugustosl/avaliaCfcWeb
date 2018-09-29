
apoioApp.controller('VeiculoController', 
	function ($scope, $rootScope, $routeParams, $sessionStorage, notify, instrutorService, veiculoService){
		
		console.log("chegou no controller de veiculo");
		var veiculoCtrl = this;

		$scope.$emit("tituloPagina", "Veículos");


		veiculoCtrl.processando = false;
		veiculoCtrl.modoEdicao = false;

		veiculoCtrl.veiculos = [];
		veiculoCtrl.veiculo = {};
		veiculoCtrl.veiculoSelecionado;
		veiculoCtrl.instrutores = [];
		veiculoCtrl.cfc = $sessionStorage.usuarioLogado;

		veiculoCtrl.tipos = ['carro', 'moto'];

		veiculoCtrl.msg = null;
		veiculoCtrl.msgErro = null;


		var notificarErro = function(msg){
			notify({ message: msg, 
					classes: 'alert-danger', position: 'right', duration: 3000 });
		};

		var notificarSucesso = function(msg){
			notify({ message: msg, 
					classes: 'alert-success', position: 'right', duration: 3000 });
		};
		
	

		var novoVeiculo = function(){
			veiculoCtrl.veiculo = {};
			console.log('cfc selecionado : ',veiculoCtrl.cfc);
			veiculoCtrl.veiculo.cfc = veiculoCtrl.cfc._id;
		};
		

		var callbackRemover = function(){
			console.log("callback remover veiculo ", veiculoCtrl.veiculoSelecionado);
			
			var indexOfItem = veiculoCtrl.veiculos.indexOf(veiculoCtrl.veiculoSelecionado);
	        veiculoCtrl.veiculos.splice(indexOfItem, 1);
	        
			veiculoCtrl.processando  = false;
			veiculoCtrl.msg = "veiculo foi removido com sucesso";
			veiculoCtrl.msgErro = '';
			notificarSucesso(veiculoCtrl.msg);
			veiculoCtrl.veiculoSelecionado = null;
		};

		var callbackRemoverErro= function(resultado){
			veiculoCtrl.processando  = false;
			veiculoCtrl.msg = "";
			veiculoCtrl.msgErro = 'Ocorreu um erro ao remover o veiculo';

			notificarErro(veiculoCtrl.msgErro);
			veiculoCtrl.veiculoSelecionado = null;
		};

		veiculoCtrl.remover = function(i){
			console.log('remover ', i);

			veiculoCtrl.processando = true;
			veiculoCtrl.veiculoSelecionado = i;
			veiculoService.remover(i._id, callbackRemover, callbackRemoverErro);		
		};


		veiculoCtrl.editar = function(veiculo){
			console.log('editar ', veiculo);
			veiculoCtrl.modoEdicao = true;
			veiculoCtrl.veiculo = veiculo;
		};

		veiculoCtrl.cancelarEditar = function(){
			veiculoCtrl.modoEdicao = false;
			veiculoCtrl.veiculo = {};
			notificarSucesso("Edição cancelada!");
		};

	        	
		var callbackSalvar = function(resultado){
			console.log("call back salvar", resultado);

			veiculoCtrl.processando  = false;
			veiculoCtrl.msg = "veiculo foi salvo com sucesso";
			veiculoCtrl.msgErro = '';
			veiculoCtrl.veiculos.push(resultado);

			notificarSucesso(veiculoCtrl.msg);

			novoVeiculo();
		};

		var callbackSalvarErro= function(resultado){
			veiculoCtrl.processando  = false;
			veiculoCtrl.msg = "";
			veiculoCtrl.msgErro = 'Ocorreu um erro ao salvar o veiculo';
			notificarErro(veiculoCtrl.msgErro);
		};

		veiculoCtrl.salvar = function(){
			veiculoCtrl.processando = true;	
			console.log('salvar : ',veiculoCtrl.veiculo);
			preencherNomeInstrutorPorId(veiculoCtrl.veiculo.idInstrutorResponsavel);
			
			console.log(veiculoCtrl.veiculo);
			veiculoService.salvar(veiculoCtrl.veiculo, callbackSalvar, callbackSalvarErro);		
		};


		var callbackListar = function(resultado){
			console.log("call back listar", resultado);
			veiculoCtrl.veiculos = resultado;
			veiculoCtrl.processando  = false;
		};
		
		veiculoCtrl.getVeiculos = function(parametros){
			veiculoCtrl.processando = true;
			veiculoService.listar(parametros, callbackListar);		
		};


		veiculoCtrl.pesquisar = function(){
			console.log('cfc logado ',veiculoCtrl.cfc._id);
			var p = 'cfc='+veiculoCtrl.cfc._id;
			if(veiculoCtrl.pesquisa && veiculoCtrl.pesquisa.nome){
				p += '&nome='+veiculoCtrl.pesquisa.nome;
			}

			if(p){
				p = '?'+p;
			}
			veiculoCtrl.getVeiculos(p);
		};


		var preencherNomeInstrutorPorId = function(idInstrutor){
			console.log('id instrutor para recuperar ',idInstrutor);
			veiculoCtrl.instrutores.forEach(function(element){
				console.log('element   :  ',element);
				console.log('element._id == idInstrutor:::: ', (element._id+'' == idInstrutor+''));
				if(element._id+'' == idInstrutor+''){
					console.log('vai retornar');
					veiculoCtrl.veiculo.nomeInstrutorResponsavel = element.nome;
				}
			});
		};


		var callbackListarInstrutores = function(resultado){
			console.log("call back listar instrutores", resultado);
			veiculoCtrl.instrutores = resultado;
		};
		
		veiculoCtrl.getInstrutores = function(){
			instrutorService.listar('?cfc='+veiculoCtrl.cfc._id, callbackListarInstrutores);		
		};


		

		//init

		novoVeiculo();

		console.log('PROCESSANDO: ',veiculoCtrl.processando);
		if(!veiculoCtrl.processando){
			veiculoCtrl.pesquisar();
			veiculoCtrl.getInstrutores();
		}
		
		

	}
	
);