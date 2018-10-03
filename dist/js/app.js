
var apoioApp = angular.module('apoioApp', ['ngRoute', "ngStorage", "cgNotify", "chart.js","angularMoment"])
		.config(function($routeProvider, $locationProvider,$logProvider) {
			$routeProvider.when('/index', {templateUrl:'/view/principal.html', controller: 'PrincipalController'})
						  .when('/dashboard', {templateUrl:'/view/dashboard.html', controller: 'DashboardController'})
						  .when('/novaCfc', {templateUrl:'/view/cadastrarCfc.html', controller: 'NovaCfcController'})
						  .when('/cadInstrutor', {templateUrl:'/view/cadastroInstrutor.html', controller: 'InstrutorController'})
						  .when('/cadAluno', {templateUrl:'/view/cadastroAluno.html', controller: 'AlunoController'})
						  .when('/minhaConta', {templateUrl:'/view/minhaConta.html', controller: 'CfcController'})
						  .when('/pesquisarAluno', {templateUrl:'/view/pesquisarAluno.html', controller: 'AlunoPesquisarController'})
						  .when('/dashboardAluno/:idAluno', {templateUrl:'/view/pesquisarAluno.html', controller: 'AlunoPesquisarController'})
						  .when('/veiculos', {templateUrl:'/view/cadastroVeiculo.html', controller: 'VeiculoController'})

						  .when('/precos', {templateUrl:'/view/preco.html', controller: 'PrincipalController'})
						  .when('/contato', {templateUrl:'/view/contato.html', controller: 'ContatoController'})
						  .when('/funcionamento', {templateUrl:'/view/funcionamento.html', controller: 'PrincipalController'})

						  //.when('/acompanhar', {template:'/view/acompanhar.html', controller: 'GraficoController'})
						 // .when('/chamados', {templateUrl:'/view/chamados.html', controller: 'ChamadosController'})
						  .otherwise({redirectTo:'/index'});

			$locationProvider.html5Mode(true);
			
			$logProvider.debugEnabled(true);
			
		});

apoioApp.directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Você tem certeza que deseja continuar?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
}])

//lib Chart : http://jtblin.github.io/angular-chart.js/
