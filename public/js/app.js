
var apoioApp = angular.module('apoioApp', ['ngRoute', "ngStorage", "cgNotify", "chart.js","angularMoment"])
		.config(function($routeProvider, $locationProvider,$logProvider) {
			$routeProvider.when('/index', {templateUrl:'/view/principal.html', controller: 'PrincipalController'})
						  .when('/dashboard', {templateUrl:'/view/principal.html', controller: 'PrincipalController'})
						  .when('/novaCfc', {templateUrl:'/view/cadastrarCfc.html', controller: 'NovaCfcController'})
						  .when('/cadInstrutor', {templateUrl:'/view/cadastroInstrutor.html', controller: 'InstrutorController'})
						  .when('/cadAluno', {templateUrl:'/view/cadastroAluno.html', controller: 'AlunoController'})
						  .when('/minhaConta', {templateUrl:'/view/minhaConta.html', controller: 'CfcController'})
						  .when('/pesquisarAluno', {templateUrl:'/view/pesquisarAluno.html', controller: 'AlunoPesquisarController'})
						  //.when('/acompanhar', {template:'/view/acompanhar.html', controller: 'GraficoController'})
						 // .when('/chamados', {templateUrl:'/view/chamados.html', controller: 'ChamadosController'})
						  .otherwise({redirectTo:'/index'});

			$locationProvider.html5Mode(true);
			
			$logProvider.debugEnabled(true);
			
		});



//lib Chart : http://jtblin.github.io/angular-chart.js/
