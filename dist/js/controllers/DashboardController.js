

apoioApp.controller('DashboardController',
	function ($scope, $rootScope, $sessionStorage, $http, $log, dashboardCfcService, instrutorService){

		/*
			FLUXO DE RECUPERAÇÂO DAS INFORMAÇÔES

			1- busca os instrutores
			2- no callback dos instrutores dispara os demais dashss
			3- monta os gráficos

		*/
		
		var dashboardCtrl = this;

		dashboardCtrl.processando = false;

		dashboardCtrl.cfc = $sessionStorage.usuarioLogado;
		dashboardCtrl.instrutores = [];
		dashboardCtrl.aulasAtivas = [];
		dashboardCtrl.aulasDiaInstrutor = [];
		dashboardCtrl.kmDiaInstrutor = [];

		console.log("Dashboard Controller");


		$scope.$emit("tituloPagina", "Dashboard");


		// Variaveis de exibição na tela e graficos
		dashboardCtrl.totalAulasDoDia = 0;
		dashboardCtrl.graficoAulasInstrutorDoDia = {};

		dashboardCtrl.totalKmDoDia = 0;
		dashboardCtrl.graficoKmInstrutorDoDia = {};





		// INSTRUTORES

		var callbackBuscarInstrutores = function(resultado){
			console.log("callback buscar instrutores: ", resultado);
			dashboardCtrl.instrutores = resultado;

			// DISPARAR DASHSSS
			dashboardCtrl.buscarAulasAtivas();
			dashboardCtrl.buscarAulasDoDiaPorInstrutor();
			dashboardCtrl.buscarKmDoDiaPorInstrutor();
		};


		
		dashboardCtrl.buscarInstrutores  = function(){
			dashboardCtrl.processando = true;
			instrutorService.listar('?cfc='+dashboardCtrl.cfc._id, callbackBuscarInstrutores);		
		};

		// buscar 1 instrutor por id na listagem de instrutores previamente carregada
		dashboardCtrl.recuperarInstrutorPorId = function(idInstrutor){
			for(let f = 0; f < dashboardCtrl.instrutores.length; f++){
				let i = dashboardCtrl.instrutores[f];
				if(idInstrutor == i._id){
					return i;
				}
			}
		};


		// DASH
		var callbackAulasAtivas = function(resultado){
			console.log("callback buscar aulas ativas: ", resultado);
			

			dashboardCtrl.instrutores.forEach(function(instrutor){
				instrutor.emAula = false;
				resultado.forEach(function(aula){ 
					if(aula.instrutor == instrutor._id){
						instrutor.emAula = true;
					}
				});		
			});

			dashboardCtrl.aulasAtivas = resultado;

			console.log('Instrutores apos processamento : ', dashboardCtrl.instrutores);

		};
		
		// busca as aulas que estão acontencendo no momento
		dashboardCtrl.buscarAulasAtivas  = function(){
			console.log('Vai buscar aulas ativas: ');
			dashboardCfcService.listarAulasAtivas(dashboardCtrl.cfc._id, callbackAulasAtivas);		
		};
		

		var callbackAulasDiaPorInstrutor = function(resultado){
			console.log("callback buscar aulas callbackAulasDiaPorInstrutor: ", resultado);
			dashboardCtrl.aulasDiaInstrutor = resultado;

			dashboardCtrl.processando = false;

			dashboardCtrl.graficoAulasInstrutorDoDia.data = [];
			dashboardCtrl.graficoAulasInstrutorDoDia.labels = [];
			dashboardCtrl.graficoAulasInstrutorDoDia.options = {};

			dashboardCtrl.aulasDiaInstrutor.forEach(function(totalAula){
				console.log(totalAula);

				dashboardCtrl.graficoAulasInstrutorDoDia.data.push(totalAula.total);
				dashboardCtrl.totalAulasDoDia = dashboardCtrl.totalAulasDoDia + totalAula.total;

				console.log('vai recuperar o instrutor: ',totalAula._id.instrutor);
				let instrutor = dashboardCtrl.recuperarInstrutorPorId(totalAula._id.instrutor);
				console.log('Instrutor RECUPERADO: ', instrutor);
				dashboardCtrl.graficoAulasInstrutorDoDia.labels.push(instrutor.nome);

			});
			
			console.log(dashboardCtrl.graficoAulasInstrutorDoDia);

		};
		
		// busca total de aulas por dia de cada instrutor
		dashboardCtrl.buscarAulasDoDiaPorInstrutor  = function(){
			dashboardCfcService.listarAulasDoDiaPorInstrutor(dashboardCtrl.cfc._id, callbackAulasDiaPorInstrutor);		
		};



		var callbackKmDiaPorInstrutor = function(resultado){
			console.log("callback buscar aulas callbackKmDiaPorInstrutor: ", resultado);
			dashboardCtrl.kmDiaInstrutor = resultado;

			dashboardCtrl.graficoKmInstrutorDoDia.data = [];
			dashboardCtrl.graficoKmInstrutorDoDia.labels = [];
			dashboardCtrl.graficoKmInstrutorDoDia.options = {};

			dashboardCtrl.kmDiaInstrutor.forEach(function(totalAula){
				console.log(totalAula);

				dashboardCtrl.graficoKmInstrutorDoDia.data.push(totalAula.total);
				dashboardCtrl.totalKmDoDia = dashboardCtrl.totalKmDoDia + totalAula.total;

				let instrutor = dashboardCtrl.recuperarInstrutorPorId(totalAula._id.instrutor);
				dashboardCtrl.graficoKmInstrutorDoDia.labels.push(instrutor.nome);

			});
			
			console.log(dashboardCtrl.graficoKmInstrutorDoDia);

		};
		
		// busca total de aulas por dia de cada instrutor
		dashboardCtrl.buscarKmDoDiaPorInstrutor  = function(){
			dashboardCfcService.listarKmDoDiaPorInstrutor(dashboardCtrl.cfc._id, callbackKmDiaPorInstrutor);		
		};




		// INICIALIZAÇÂO
		if(!dashboardCtrl.processando){
			console.log('VAI BUSCAR OS INSTRUTORES');
			dashboardCtrl.processando = true;
			dashboardCtrl.buscarInstrutores();
		}
		

	}
);
