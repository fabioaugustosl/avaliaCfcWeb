
apoioApp.controller('PrincipalController',
	function ($scope, $rootScope, $routeParams, $location, $sessionStorage, notify, cfcService){
		$scope.tituloPagina = "PRINCIPAL";

		console.log('principal controller');

		$scope.$on('tituloPagina', function (event, args) {
		 	$scope.tituloPagina = args;
		});

		$scope.$on('usuarioLogado', function (event, args) {
			 	$scope.usuarioLogado = args;
			 	console.log('CHEGOU EMIT USUARIO LOGADO: ',$scope.usuarioLogado);
			});

		$scope.usuarioLogado = $sessionStorage.usuarioLogado;

		console.log('USUARIO LOGADO: ',$scope.usuarioLogado);


		// Parte referente ao login do usuario
		$scope.msg;
		$scope.modoLogin = false;
		$scope.email;
		$scope.senha;

		$scope.ativarModoLogin = function(){
			$scope.modoLogin = true;
			$scope.email = null;
			$scope.senha = null;
		};

		$scope.cancelarModoLogin = function(){
			$scope.modoLogin = false;
			$scope.email = null;
			$scope.senha = null;
		};

		$scope.logout = function(){
			$scope.usuarioLogado = null;
			$sessionStorage.usuarioLogado = null;
			$scope.irParaPrincipal();
		};

		var callbackLogin = function(resultado){
			console.log("Login com sucesso: ", resultado);
			if(resultado && resultado.length <= 0){
				$scope.msg = "Email ou senha inválidos.";
			} else {
				$sessionStorage.usuarioLogado = resultado[0];
				$scope.usuarioLogado = resultado[0];
				$scope.$emit("usuarioLogado", $scope.usuarioLogado);
				console.log($scope.usuarioLogado);

				notify({ message: "Bem-vindo!", classes: 'alert-success', position: 'right', duration: 3000 });

				$scope.cancelarModoLogin();
				$scope.irParaDashboard();
			}
			
		};

		var callbackErro= function(resultado){
			console.log("CB erro ", resultado);
			$scope.msg = resultado;
		};

		$scope.efetuarLogin = function(){
			if($scope.email && $scope.senha){
				cfcService.autenticar($scope.email, $scope.senha, callbackLogin, callbackErro);
			}
		};



		// Menus
		$scope.irParaNovaCfc = function(){
			console.log("go to nova cfc");
			$location.replace();
			$location.url('/novaCfc');
		};

		$scope.irParaPrincipal = function(){
			$location.replace();
			$location.url('/index');
		};

		$scope.irParaDashboard = function(){
			$location.replace();
			$location.url('/dashboard');
		};

		$scope.irParaVeiculos = function(){
			$location.replace();
			$location.url('/veiculos');
		};

		$scope.irParaInstrutores = function(){
			$location.replace();
			$location.url('/cadInstrutor');
		};

		$scope.irParaAlunos = function(){
			$location.replace();
			$location.url('/cadAluno');
		};
		
		$scope.irParaMinhaConta = function(){
			$location.replace();
			$location.url('/minhaConta');
		};

		$scope.irParaPesquisaAluno = function(){
			$location.replace();
			$location.url('/pesquisarAluno');
		};

		$scope.irParaPreco = function(){
			$location.replace();
			$location.url('/precos');
		};

		$scope.irParaContato = function(){
			$location.replace();
			$location.url('/contato');
		};

		$scope.irParaFuncionamento = function(){
			$location.replace();
			$location.url('/funcionamento');
		};
	}
);

