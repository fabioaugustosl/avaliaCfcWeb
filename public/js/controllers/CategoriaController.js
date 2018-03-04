
apoioApp.controller('CategoriaController', 
	function ($scope, $rootScope, $routeParams, $sessionStorage, notify, categoriaService){
		
		console.log("chegou no controller de categorias");
		var categoriaCtrl = this;

		$scope.$emit("tituloPagina", "Categorias");
		var dono = $sessionStorage.dono;

		$scope.pesquisa = {};

		categoriaCtrl.processando = false;

		categoriaCtrl.categorias = {};

		categoriaCtrl.msg = null;
		categoriaCtrl.msgErro = null;


		var notificarErro = function(msg){
			notify({ message: msg, 
					classes: 'alert-danger', position: 'right', duration: 3000 });
		};

		var notificarSucesso = function(msg){
			notify({ message: msg, 
					classes: 'alert-success', position: 'right', duration: 3000 });
		};
		
		
		var iniciarCategoria = function(){
			
			categoriaCtrl.categoria = {};
			categoriaCtrl.categoria.dono = dono;

		};
		iniciarCategoria();



		var callbackRemover = function(){
			console.log("callback remover Categoria");
			
			var indexOfItem = categoriaCtrl.categorias.indexOf(categoriaCtrl.categoriaRemover);
	        categoriaCtrl.categorias.splice(indexOfItem, 1);
	        
			categoriaCtrl.processando  = false;
			categoriaCtrl.msg = "Categoria foi removida com sucesso";
			notificarSucesso(categoriaCtrl.msg);
			categoriaCtrl.msgErro = '';
			categoriaCtrl.categoriaRemover = null;
		};

		var callbackRemoverErro= function(resultado){
			categoriaCtrl.processando  = false;
			categoriaCtrl.msg = "";
			categoriaCtrl.msgErro = 'Ocorreu um erro ao remover o Categoria';

			notificarErro(categoriaCtrl.msgErro);
			categoriaCtrl.categoriaRemover = null;
		};

		categoriaCtrl.remover = function(ap){
			console.log('remover ', ap);

			categoriaCtrl.processando = true;
			categoriaCtrl.categoriaRemover = ap;
			categoriaService.remover(ap.id, callbackRemover, callbackRemoverErro);		
		};


	        	
		var callbackSalvar = function(resultado){
			console.log("call back salvar", resultado);

			categoriaCtrl.processando  = false;
			categoriaCtrl.msg = "Categoria foi salvo com sucesso";
			categoriaCtrl.msgErro = '';
			categoriaCtrl.categorias.push(resultado);

			notificarSucesso(categoriaCtrl.msg);

			iniciarCategoria();
		};

		var callbackSalvarErro= function(resultado){
			categoriaCtrl.processando  = false;
			categoriaCtrl.msg = "";
			categoriaCtrl.msgErro = 'Ocorreu um erro ao salvar o Categoria';
			notificarErro(categoriaCtrl.msgErro);
		};

		categoriaCtrl.salvar = function(){
			categoriaCtrl.processando = true;	
			if(!categoriaCtrl.categoria.prioridade){
				categoriaCtrl.categoria.prioridade = false
			}
			console.log(categoriaCtrl.categoria);

			categoriaService.salvar(categoriaCtrl.categoria, callbackSalvar, callbackSalvarErro);		
		};




		var callbackListar = function(resultado){
			console.log("call back listar", resultado);
			categoriaCtrl.categorias = resultado;
			categoriaCtrl.processando  = false;
		};
		
		categoriaCtrl.getCategorias = function(parametros){
			categoriaCtrl.processando = true;
			categoriaService.listar(parametros, callbackListar);		
		};




		categoriaCtrl.pesquisar = function(){
				
			var p = 'dono='+dono;
			if(categoriaCtrl.pesquisa && categoriaCtrl.pesquisa.nome){
				p += '&nome='+categoriaCtrl.pesquisa.nome;
			}
			// if(categoriaCtrl.pesquisa.conta){
			// 	if(p){
			// 		p += '&';
			// 	}
			// 	p += 'info_extra3='+$scope.pesquisa.conta;
			// }

			if(p){
				p = '?'+p;
			}

			//console.log(p);
			categoriaCtrl.getCategorias(p);
		};


		console.log('PROCESSANDO: ',categoriaCtrl.processando);
		if(!categoriaCtrl.processando){
			//categoriaCtrl.getEmpresas();
			categoriaCtrl.pesquisar();
		}
		

	}
	
);