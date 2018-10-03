
apoioApp.controller('AlunoPesquisarController', 
	function ($scope, $rootScope, $routeParams, $sessionStorage,$location, notify, moment, alunoService, aulaService, cfcService, dashboardService){
		
		console.log("chegou no controller de aluno pesquisar");
		var alunoCtrl = this;

		var idAluno = $routeParams.idAluno;
		console.log("  >>> id ALUNO ", idAluno);

		$scope.$emit("tituloPagina", "Desempenho do aluno");


		alunoCtrl.processando = false;

		alunoCtrl.codigoAlunoInformado = null;
		alunoCtrl.aluno;
		alunoCtrl.cfc = $sessionStorage.usuarioLogado;

		alunoCtrl.msgErro = null;


		// relatorio aulas
		alunoCtrl.aulas = {};
		alunoCtrl.exercicios = [];
		alunoCtrl.dash = {};
		alunoCtrl.graficoMediaPorExercicio = null;



		var notificarErro = function(msg){
			notify({ message: msg, 
					classes: 'alert-danger', position: 'right', duration: 3000 });
		};

		var notificarSucesso = function(msg){
			notify({ message: msg, 
					classes: 'alert-success', position: 'right', duration: 3000 });
		};
		


		//callback dash
		var callbackRecuperarCfc =  function(cfcRetorno){
			console.log(cfcRetorno);
			alunoCtrl.cfc  = cfcRetorno;
			for(var f = 0; f < cfcRetorno.exercicios.length; f++){
				var exe = cfcRetorno.exercicios[f];
				alunoCtrl.exercicios[exe._id] = exe.nome;
			}
			// dados graficos avaliações
			dashboardService.listarMediaNotasPorExercicio(alunoCtrl.aluno.cfc, alunoCtrl.aluno.login, callbackListarDashExercicios);
			dashboardService.listarMediaNotasPorAula(alunoCtrl.aluno.cfc, alunoCtrl.aluno.login, callbackListarDashAula);
		};

		var callbackListarDashExercicios= function(resultado){
			console.log("call back  callbackListarDashExercicios", resultado);

			alunoCtrl.graficoMediaPorExercicio = {};
			alunoCtrl.graficoMediaPorExercicio.labels = [];
			alunoCtrl.graficoMediaPorExercicio.series = ['Aproveitamento em % '];
			alunoCtrl.graficoMediaPorExercicio.data = [ ];

			var dados = []; 
			for(var i=0; i<resultado.length ;i++){
				var d = resultado[i];
				alunoCtrl.graficoMediaPorExercicio.labels.push(alunoCtrl.exercicios[d._id.exercicio]);
				dados.push((d.nota * 100) / 5);
			}
			alunoCtrl.graficoMediaPorExercicio.data[0] = dados;
			console.log(alunoCtrl.graficoMediaPorExercicio);

			// fazer uma media geral de desempenho
			var totalDesempenho = 0;
			for(var j=0; j < dados.length; j++ ){
				totalDesempenho += dados[j];
			}
			alunoCtrl.dash.desempenhoGeral = totalDesempenho/dados.length;
			
		};

		var callbackListarDashAula= function(resultado){
			console.log("call back  callbackListarDashAula", resultado);

			//grafico media aproveitamento por aula
			alunoCtrl.graficoMediaPorAula = {};
			alunoCtrl.graficoMediaPorAula.labels = [];
			alunoCtrl.graficoMediaPorAula.series = ['Aproveitamento em % '];
			alunoCtrl.graficoMediaPorAula.data = [ ];

			// grafico periodo das aulas
			alunoCtrl.graficoPeriodoAulas = {};
			alunoCtrl.graficoPeriodoAulas.labels = [];
			alunoCtrl.graficoPeriodoAulas.data = [];

			var periodoAula = [];
			var dados = []; 
			for(var i=0; i<resultado.length ;i++){
				var d = resultado[i];
				var aulaCompleta = alunoCtrl.aulas.aulas[d._id.aula];
				console.log('aulaCompleta ::: ',aulaCompleta);

				alunoCtrl.graficoMediaPorAula.labels.push(moment(aulaCompleta.data).format("DD/MM/YYYY"));
				dados.push((d.nota * 100) / 5);

				var p = periodoAula[aulaCompleta.periodo];
				if(!p){ p = 0;}
				p++;
				periodoAula[aulaCompleta.periodo] = p;
			}

			alunoCtrl.graficoMediaPorAula.data[0] = dados;
			console.log('alunoCtrl.graficoMediaPorAula: ',alunoCtrl.graficoMediaPorAula);
			
		
			for (var key in periodoAula) {
			  	alunoCtrl.graficoPeriodoAulas.labels.push(key);
				alunoCtrl.graficoPeriodoAulas.data.push(periodoAula[key]);
			}

			

		};



		//callback recuperar aulas 
		var callbackListarAulas = function(resultado){
			console.log("call back listar aulas", resultado);
			alunoCtrl.aulas.totalAulas = 0;
			if(resultado){
				alunoCtrl.aulas.aulas = [];
				for(var a =0; a < resultado.length; a++){
					var aula = resultado[a];
					console.log(aula);
					alunoCtrl.aulas.aulas[aula._id] = aula;	
				}
				console.log('aulas tratada ',alunoCtrl.aulas.aulas);
				 
				alunoCtrl.aulas.totalAulas = resultado.length;
			}
			

			// recupera a cfc do aluno para depois buscar os dashboards.
			cfcService.recuperarCfcPorId(alunoCtrl.aluno.cfc, callbackRecuperarCfc);

		};


		//calbacks recuperar aluno
		var callbackListarErro= function(resultado){
			alunoCtrl.processando  = false;
			alunoCtrl.msgErro = 'Ocorreu um erro ao recuperar as informações das aulas do aluno.';
			notificarErro(alunoCtrl.msgErro);
		};


		var callbackListar = function(resultado){
			console.log("call back listar", resultado);
			if(resultado && resultado.length > 0){
				alunoCtrl.aluno = resultado[0];	

				console.log(alunoCtrl.aluno);
				
				// dados aulas 
				// OBS: após recuperar as aulas ele busca as notas
				aulaService.listar("?aluno="+alunoCtrl.aluno._id, callbackListarAulas);

			} else {
				alunoCtrl.msgErro = 'Aluno não encontrado';
			}

			

			alunoCtrl.processando  = false;
		};


		alunoCtrl.voltarTelaAluno = function(){
			$location.replace();
			$location.url('/cadAluno');
		};


		alunoCtrl.buscarAluno = function(){
			alunoCtrl.aulas = {};

			alunoCtrl.msgErro = null;
			alunoCtrl.processando = true;
			alunoService.listar("?login="+alunoCtrl.codigoAlunoInformado, callbackListar, callbackListarErro);		
		};



		if(idAluno){
			alunoCtrl.pesquisaAtiva = false;
			alunoCtrl.codigoAlunoInformado = idAluno;
			alunoCtrl.buscarAluno();
		} else {
			alunoCtrl.pesquisaAtiva = true;
		}


	              

	}
	
);